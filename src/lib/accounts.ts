import bcrypt from "bcryptjs";
import { createHmac, randomUUID } from "node:crypto";
import { z } from "zod";
import { query } from "./db";

export const registrationSchema = z.object({
  name: z.string().trim().min(2, "Escribe tu nombre (mínimo 2 caracteres).").max(80),
  email: z.email("Escribe un correo válido.").max(254).transform(value => value.trim().toLowerCase()),
  password: z.string().min(10, "Usa al menos 10 caracteres.").max(72, "Usa como máximo 72 caracteres.").refine(value => Buffer.byteLength(value, "utf8") <= 72, "La contraseña es demasiado larga."),
});
const dummyHash = bcrypt.hash("non-existent-survivor-account", 12);
const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000;
const keyFor = (value: string) => createHmac("sha256", process.env.NEXTAUTH_SECRET || "local-development").update(value).digest("hex");
export async function registerAccount(input: unknown) {
  const data = registrationSchema.parse(input);
  const hash = await bcrypt.hash(data.password, 12);
  const rows = await query(`INSERT INTO survivors (id,name,email,password_hash,created_at) VALUES (?,?,?,?,?) ON CONFLICT(email) DO NOTHING RETURNING id`, [randomUUID(),data.name,data.email,hash,Date.now()]);
  return rows.length > 0;
}
export async function authenticateAccount(emailInput: string, password: string) {
  const email = emailInput.trim().toLowerCase();
  if (!z.email().safeParse(email).success || password.length > 72 || Buffer.byteLength(password) > 72) return null;
  const key = keyFor(`login:${email}`);
  const now = Date.now();
  const [attempt] = await query("SELECT * FROM attempts WHERE key=?", [key]);
  if (Number(attempt?.locked_until || 0) > now) throw new Error("ACCOUNT_LOCKED");
  const [user] = await query("SELECT * FROM survivors WHERE email=?", [email]);
  const matches = await bcrypt.compare(password, user ? String(user.password_hash) : await dummyHash);
  if (!user || !matches) {
    const [row] = await query(`INSERT INTO attempts (key,failures,locked_until,updated_at) VALUES (?,1,0,?) ON CONFLICT(key) DO UPDATE SET failures=CASE WHEN attempts.updated_at < ? THEN 1 ELSE attempts.failures+1 END, updated_at=? RETURNING failures`, [key,now,now-LOCK_MS,now]);
    if (Number(row.failures) >= MAX_ATTEMPTS) {
      await query("UPDATE attempts SET locked_until=? WHERE key=?", [now+LOCK_MS,key]);
      throw new Error("ACCOUNT_LOCKED");
    }
    return null;
  }
  // A simultaneous failed request must not allow a login after the lock activates.
  const [latest] = await query("SELECT locked_until FROM attempts WHERE key=?", [key]);
  if (Number(latest?.locked_until || 0) > Date.now()) throw new Error("ACCOUNT_LOCKED");
  await query("DELETE FROM attempts WHERE key=?", [key]);
  return { id: String(user.id), name: String(user.name), email: String(user.email) };
}
export async function allowRegistration(ip: string) {
  const now = Date.now();
  const key = keyFor(`register:${ip}`);
  const [row] = await query(`INSERT INTO attempts (key,failures,locked_until,updated_at) VALUES (?,1,0,?) ON CONFLICT(key) DO UPDATE SET failures=CASE WHEN attempts.updated_at < ? THEN 1 ELSE attempts.failures+1 END, updated_at=CASE WHEN attempts.updated_at < ? THEN ? ELSE attempts.updated_at END RETURNING failures`, [key,now,now-3600000,now-3600000,now]);
  return Number(row.failures) <= 10;
}
