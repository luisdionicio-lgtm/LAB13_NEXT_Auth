import { createClient, type Client } from "@libsql/client";
import postgres from "postgres";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

type Value = string | number | null;
type Row = Record<string, unknown>;
let sqlite: Client | undefined;
let pg: ReturnType<typeof postgres> | undefined;
let ready: Promise<void> | undefined;
async function raw(sql: string, args: Value[] = []): Promise<Row[]> {
  if (process.env.DATABASE_URL?.startsWith("postgres")) {
    pg ??= postgres(process.env.DATABASE_URL, { max: 3, prepare: false });
    let index = 0;
    return [...await pg.unsafe(sql.replace(/\?/g, () => `$${++index}`), args)];
  }
  if (!sqlite) {
    if (process.env.VERCEL && !process.env.TURSO_DATABASE_URL) throw new Error("Configura DATABASE_URL o TURSO_DATABASE_URL para guardar usuarios en producción.");
    if (!process.env.TURSO_DATABASE_URL) mkdirSync(resolve(".data"), { recursive: true });
    sqlite = createClient({ url: process.env.TURSO_DATABASE_URL || `file:${resolve(".data/survivors.db")}`, authToken: process.env.TURSO_AUTH_TOKEN });
  }
  return (await sqlite.execute({ sql, args })).rows as unknown as Row[];
}
async function initialize() {
  await raw(`CREATE TABLE IF NOT EXISTS survivors (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at BIGINT NOT NULL)`);
  await raw(`CREATE TABLE IF NOT EXISTS attempts (key TEXT PRIMARY KEY, failures BIGINT NOT NULL DEFAULT 0, locked_until BIGINT NOT NULL DEFAULT 0, updated_at BIGINT NOT NULL)`);
}
export async function query(sql: string, args: Value[] = []) {
  ready ??= initialize().catch(error => { ready = undefined; throw error; });
  await ready;
  return raw(sql, args);
}
