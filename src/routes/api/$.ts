// JSON API for the owner dashboard. /api/auth/* signs in and out; every /api/admin/* call
// checks the session (requireAdmin) and, for writes, that it came from this site's pages.
import { createFileRoute } from "@tanstack/react-router";
import {
  HttpError,
  changePassword,
  clearSessionCookie,
  isAuthenticated,
  messages,
  requireAdmin,
  requireSameOrigin,
  signIn,
} from "@/data/auth.server";
import * as admin from "@/data/admin.server";

const json = (data: unknown, init: ResponseInit = {}) =>
  new Response(JSON.stringify(data ?? { ok: true }), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
      ...init.headers,
    },
  });

type Body = Partial<Record<"password" | "remember" | "dir" | "current" | "next", unknown>> &
  admin.Body;
const body = async (request: Request): Promise<Body> => {
  try {
    const value: unknown = await request.json();
    return value && typeof value === "object" ? (value as Body) : {};
  } catch {
    return {};
  }
};

const id = (value: string | undefined) => {
  const n = Number(value);
  if (!Number.isInteger(n) || n <= 0) throw new HttpError(404, "Not found.");
  return n;
};

async function handle(request: Request, path: string[]): Promise<Response> {
  const method = request.method;
  const [area, ...rest] = path;
  requireSameOrigin(request);

  if (area === "auth") {
    const [action] = rest;
    if (action === "me" && method === "GET") {
      return json({ signedIn: await isAuthenticated(request) });
    }
    if (action === "login" && method === "POST") {
      const b = await body(request);
      const password = typeof b.password === "string" ? b.password : "";
      if (!password) throw new HttpError(400, messages.wrongPassword);
      const cookie = await signIn(request, password, b.remember !== false);
      return json({ ok: true }, { headers: { "set-cookie": cookie } });
    }
    if (action === "logout" && method === "POST") {
      return json({ ok: true }, { headers: { "set-cookie": clearSessionCookie() } });
    }
    throw new HttpError(404, "Not found.");
  }

  if (area !== "admin") throw new HttpError(404, "Not found.");
  await requireAdmin(request);
  const c = admin.ctx(request);
  const [section, a, b, d, e] = rest;

  switch (section) {
    case "overview":
      return json(await admin.overview(c));

    case "projects": {
      if (!a) {
        if (method === "GET") return json(await admin.listProjects(c));
        if (method === "POST") return json(await admin.createProject(c, await body(request)));
        break;
      }
      const projectId = id(a);
      if (!b) {
        if (method === "GET") return json(await admin.getProject(c, projectId));
        if (method === "PUT")
          return json(await admin.updateProject(c, projectId, await body(request)));
        if (method === "DELETE") return json(await admin.deleteProject(c, projectId));
      }
      if (b === "move" && method === "POST") {
        return json(await admin.moveProject(c, projectId, Number((await body(request)).dir)));
      }
      if (b === "images") {
        if (!d && method === "POST")
          return json(await admin.addProjectImage(c, projectId, await request.formData()));
        const imageId = id(d);
        if (!e && method === "DELETE")
          return json(await admin.deleteProjectImage(c, projectId, imageId));
        if (e === "cover" && method === "POST")
          return json(await admin.setProjectCover(c, projectId, imageId));
        if (e === "move" && method === "POST") {
          return json(
            await admin.moveProjectImage(c, projectId, imageId, Number((await body(request)).dir)),
          );
        }
      }
      break;
    }

    case "services": {
      if (!a) {
        if (method === "GET") return json(await admin.listServices(c));
        break;
      }
      const serviceId = id(a);
      if (!b) {
        if (method === "GET") return json(await admin.getService(c, serviceId));
        if (method === "PUT")
          return json(await admin.updateService(c, serviceId, await body(request)));
      }
      if (b === "move" && method === "POST") {
        return json(await admin.moveService(c, serviceId, Number((await body(request)).dir)));
      }
      if (b === "photo" && d && method === "POST") {
        return json(await admin.setServicePhoto(c, serviceId, d, await request.formData()));
      }
      if (b === "images") {
        if (!d && method === "POST")
          return json(await admin.addServiceImage(c, serviceId, await request.formData()));
        const imageId = id(d);
        if (!e && method === "PUT")
          return json(await admin.updateServiceImage(c, serviceId, imageId, await body(request)));
        if (!e && method === "DELETE")
          return json(await admin.deleteServiceImage(c, serviceId, imageId));
        if (e === "cover" && method === "POST")
          return json(await admin.useServiceImageAsCover(c, serviceId, imageId));
        if (e === "move" && method === "POST") {
          return json(
            await admin.moveServiceImage(c, serviceId, imageId, Number((await body(request)).dir)),
          );
        }
      }
      break;
    }

    case "photos": {
      if (!a && method === "GET") return json(await admin.listPagePhotos(c));
      if (a && method === "POST")
        return json(await admin.setPagePhoto(c, a, await request.formData()));
      if (a && method === "DELETE") return json(await admin.resetPagePhoto(c, a));
      break;
    }

    case "settings": {
      if (!a) {
        if (method === "GET") return json(await admin.getSettings(c));
        if (method === "PUT") return json(await admin.saveSettings(c, await body(request)));
      }
      if (a === "password" && method === "POST") {
        const b2 = await body(request);
        await changePassword(
          request,
          typeof b2.current === "string" ? b2.current : "",
          typeof b2.next === "string" ? b2.next : "",
        );
        return json({ ok: true });
      }
      if (a === "profile") {
        if (method === "POST")
          return json(await admin.setCompanyProfile(c, await request.formData()));
        if (method === "DELETE") return json(await admin.removeCompanyProfile(c));
      }
      break;
    }
  }
  throw new HttpError(404, "Not found.");
}

async function respond(request: Request, splat: string | undefined) {
  try {
    return await handle(request, (splat ?? "").split("/").filter(Boolean));
  } catch (error) {
    if (error instanceof HttpError) return json({ error: error.message }, { status: error.status });
    console.error("Dashboard API error", error);
    return json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      ANY: ({ request, params }) => respond(request, params._splat),
    },
  },
});
