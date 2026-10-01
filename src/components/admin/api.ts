// Browser side of the dashboard API (/api/*).

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function api<T = { ok: true }>(
  path: string,
  init: { method?: string; json?: unknown; form?: FormData } = {},
): Promise<T> {
  const response = await fetch(path, {
    method: init.method ?? (init.json !== undefined || init.form ? "POST" : "GET"),
    headers: init.json !== undefined ? { "content-type": "application/json" } : {},
    body: init.form ?? (init.json !== undefined ? JSON.stringify(init.json) : null),
    credentials: "same-origin",
  });
  const data = (await response.json().catch(() => ({}))) as { error?: string };
  if (response.status === 401 && !path.startsWith("/api/auth/")) {
    window.location.href = "/admin/login";
  }
  if (!response.ok) {
    throw new ApiError(response.status, data.error ?? "Something went wrong. Please try again.");
  }
  return data as T;
}

const ACCEPTED = /^image\/(jpeg|png|webp|avif)$/;
const MAX_SIDE = 2000;

/**
 * Shrinks a phone photo before upload: at most 2000px on the long side, saved as WebP
 * (JPEG where the browser cannot write WebP). Keeps the original if it is already smaller.
 */
export async function prepareImage(
  file: File,
): Promise<{ file: Blob; width: number; height: number }> {
  if (!ACCEPTED.test(file.type)) throw new Error("Please choose a JPG, PNG, WebP or AVIF photo.");
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const encode = (type: string, quality: number) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  let blob = await encode("image/webp", 0.82);
  if (!blob || blob.type !== "image/webp") blob = await encode("image/jpeg", 0.85);
  if (!blob || (scale === 1 && blob.size >= file.size)) return { file, width, height };
  return { file: blob, width, height };
}

/** Builds the multipart body the upload endpoints expect. */
export async function imageForm(file: File, extra: Record<string, string> = {}) {
  const prepared = await prepareImage(file);
  const form = new FormData();
  const ext =
    prepared.file.type === "image/webp"
      ? "webp"
      : prepared.file.type === "image/jpeg"
        ? "jpg"
        : "img";
  form.append("file", prepared.file, `photo.${ext}`);
  form.append("width", String(prepared.width));
  form.append("height", String(prepared.height));
  for (const [key, value] of Object.entries(extra)) form.append(key, value);
  return form;
}
