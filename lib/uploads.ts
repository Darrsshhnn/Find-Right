import "server-only";
import fs from "node:fs";
import path from "node:path";
import { mutate, now, uid, UPLOAD_DIR } from "./db";
import type { Upload } from "./types";

export const MAX_UPLOAD = 10_000_000;
const IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export function filesFrom(form: FormData, key: string) {
  return form.getAll(key).filter((f): f is File => f instanceof File && f.size > 0);
}

export function validateFiles(files: File[], { imagesOnly = false } = {}) {
  for (const file of files) {
    if (file.size > MAX_UPLOAD) return `“${file.name}” is larger than 10 MB.`;
    if (imagesOnly && !IMAGE_TYPES.includes(file.type)) return `“${file.name}” must be a PNG, JPG, WebP or GIF image.`;
  }
  return "";
}

export async function saveUpload(file: File, ownerId: string, options: { projectId?: string; conversationId?: string; public?: boolean } = {}): Promise<Upload> {
  const id = uid("up");
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, id), Buffer.from(await file.arrayBuffer()));
  const upload: Upload = {
    id, name: file.name.slice(0, 160), size: file.size, type: file.type || "application/octet-stream", ownerId,
    projectId: options.projectId, conversationId: options.conversationId, public: options.public ?? false, createdAt: now(),
  };
  mutate((d) => { d.uploads.push(upload); });
  return upload;
}

export const uploadPath = (id: string) => path.join(UPLOAD_DIR, path.basename(id));
