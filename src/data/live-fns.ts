import { createServerFn } from "@tanstack/react-start";
import { loadLiveData } from "./live.server";

/** Public, read-only: the owner-editable content for the root route's loader. */
export const getLiveData = createServerFn({ method: "GET" }).handler(() => loadLiveData());
