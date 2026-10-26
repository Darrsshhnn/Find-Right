import "server-only";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { DB } from "./types";
import { createSeed } from "./seed";

export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const DB_FILE = path.join(DATA_DIR, "db.json");

const store = globalThis as unknown as { __findrightDb?: DB };

function load(): DB {
  if (store.__findrightDb) return store.__findrightDb;
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  let db: DB;
  if (fs.existsSync(DB_FILE)) {
    db = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DB;
  } else {
    db = createSeed();
    persist(db);
  }
  store.__findrightDb = db;
  return db;
}

function persist(db: DB) {
  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

/** Read-only snapshot of the database. */
export function db(): DB {
  return load();
}

/** Apply a synchronous change and write it to disk. */
export function mutate<T>(change: (db: DB) => T): T {
  const current = load();
  const result = change(current);
  persist(current);
  return result;
}

export const uid = (prefix: string) => `${prefix}_${randomUUID().replace(/-/g, "").slice(0, 12)}`;
export const now = () => new Date().toISOString();
