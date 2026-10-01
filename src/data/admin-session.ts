import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isAuthenticated } from "./auth.server";

/** For page redirects only; the API checks the session itself on every call. */
export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => ({
  signedIn: await isAuthenticated(getRequest()),
}));
