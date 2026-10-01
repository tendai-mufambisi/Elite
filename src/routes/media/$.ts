// Serves dashboard uploads from R2 at /media/<key>. Keys contain a random UUID, so a URL
// never changes content and can be cached forever. Range requests let PDF viewers stream.
import type { R2GetOptions } from "@cloudflare/workers-types";
import { createFileRoute } from "@tanstack/react-router";
import { bindings } from "@/data/bindings.server";

async function serveMedia(request: Request, splat: string | undefined) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405, headers: { allow: "GET, HEAD" } });
  }
  const key = decodeURIComponent(splat ?? "");
  if (!key || key.includes("..")) return new Response("Not found", { status: 404 });
  const bucket = bindings(request)?.MEDIA;
  if (!bucket) return new Response("Media storage unavailable", { status: 503 });

  const rangeHeader = request.headers.get("range");
  // R2 reads the Range header itself (browser and Workers Headers types differ, hence the cast).
  const options = rangeHeader ? ({ range: request.headers } as unknown as R2GetOptions) : undefined;
  const object = await bucket.get(key, options);
  if (!object) return new Response("Not found", { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers as unknown as Parameters<typeof object.writeHttpMetadata>[0]);
  headers.set("etag", object.httpEtag);
  headers.set("accept-ranges", "bytes");
  headers.set("cache-control", "public, max-age=31536000, immutable");

  const body = request.method === "HEAD" ? null : (object.body as unknown as ReadableStream);
  const range = object.range as { offset?: number; length?: number } | undefined;
  if (rangeHeader && range && typeof range.offset === "number") {
    const start = range.offset;
    const end = start + (range.length ?? object.size - start) - 1;
    headers.set("content-range", `bytes ${start}-${end}/${object.size}`);
    headers.set("content-length", String(end - start + 1));
    return new Response(body, { status: 206, headers });
  }
  headers.set("content-length", String(object.size));
  return new Response(body, { headers });
}

export const Route = createFileRoute("/media/$")({
  server: {
    handlers: {
      GET: ({ request, params }) => serveMedia(request, params._splat),
      HEAD: ({ request, params }) => serveMedia(request, params._splat),
      ANY: ({ request, params }) => serveMedia(request, params._splat),
    },
  },
});
