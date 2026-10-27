import "server-only";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { DB } from "./types";
import { DEMO_LINKS, createSeed } from "./seed";

/**
 * Where the JSON store lives. Serverless hosts (Vercel) have a read-only project folder, so there the
 * store uses the writable temp directory — data then lasts only as long as that server instance.
 * Set FINDRIGHT_DATA_DIR to override; move to a real database for production.
 */
export const DATA_DIR = process.env.FINDRIGHT_DATA_DIR
  || (process.env.VERCEL ? path.join(os.tmpdir(), "findright") : path.join(process.cwd(), "data"));
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const DB_FILE = path.join(DATA_DIR, "db.json");

const store = globalThis as unknown as { __findrightDb?: DB; __findrightWriteWarned?: boolean };

function load(): DB {
  if (store.__findrightDb) return store.__findrightDb;
  let db: DB | undefined;
  try {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    if (fs.existsSync(DB_FILE)) db = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as DB;
  } catch (error) {
    console.warn("[findright] Could not read the data store, starting from seed data.", error);
  }
  if (!db) {
    db = createSeed();
    persist(db);
  }
  if (migrate(db)) persist(db);
  store.__findrightDb = db;
  return db;
}

/** Backfill fields added after a store was created. Returns true when something changed. */
function migrate(db: DB) {
  let changed = false;
  for (const f of db.freelancers) {
    if (f.links === undefined) { f.links = DEMO_LINKS[f.userId]?.map((l) => ({ ...l })) ?? []; changed = true; }
  }
  return changed;
}

function persist(db: DB) {
  try {
    const tmp = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
    fs.renameSync(tmp, DB_FILE);
  } catch (error) {
    // Keep serving from memory rather than failing the request (e.g. read-only filesystem).
    if (!store.__findrightWriteWarned) {
      console.warn(`[findright] Could not write ${DB_FILE}; changes are kept in memory only.`, error);
      store.__findrightWriteWarned = true;
    }
  }
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
