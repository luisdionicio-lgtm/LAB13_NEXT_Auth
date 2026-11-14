"use client";
import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function AuthForm({ google, github }: { google: boolean; github: boolean }) {
  const [register, setRegister] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setBusy(true);
    const fields = new FormData(event.currentTarget);
    const email = String(fields.get("email") || "");
    const password = String(fields.get("password") || "");
    try {
      if (register) {
        const response = await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fields.get("name"), email, password }) });
        const body = await response.json();
        if (!response.ok) { setError(body.error || "No se pudo registrar."); return; }
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) { setError(result.error.includes("ACCOUNT_LOCKED") ? "Cuenta bloqueada durante 15 minutos por intentos fallidos." : "Correo o contraseña incorrectos."); return; }
      router.push("/dashboard"); router.refresh();
    } catch { setError("No se pudo conectar. Inténtalo nuevamente."); }
    finally { setBusy(false); }
  }
  return <div className="space-y-4">
    <div className="grid gap-2"><button disabled={!google || busy} onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="w-full rounded border border-gray-300 px-4 py-3 flex justify-center items-center gap-3 disabled:opacity-40"><FaGoogle /> Continuar con Google</button><button disabled={!github || busy} onClick={() => signIn("github", { callbackUrl: "/dashboard" })} className="w-full rounded border border-gray-300 px-4 py-3 flex justify-center items-center gap-3 disabled:opacity-40"><FaGithub /> Continuar con GitHub</button></div>
    <p className="text-center text-xs text-gray-500">O USA TU CORREO</p>
    <form onSubmit={submit} className="space-y-3">{register && <label className="block text-sm">Nombre<input required minLength={2} maxLength={80} name="name" autoComplete="name" className="mt-1 w-full rounded border border-gray-300 p-3" /></label>}
      <label className="block text-sm">Correo<input required type="email" name="email" autoComplete="email" className="mt-1 w-full rounded border border-gray-300 p-3" /></label>
      <label className="block text-sm">Contraseña<input required type="password" name="password" minLength={register ? 10 : 1} maxLength={72} autoComplete={register ? "new-password" : "current-password"} className="mt-1 w-full rounded border border-gray-300 p-3" /></label>
      {register && <p className="text-xs text-gray-500">Mínimo 10 caracteres.</p>}
      {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button disabled={busy} className="w-full rounded bg-gray-900 p-3 text-white disabled:opacity-50">{busy ? "Un momento…" : register ? "Crear cuenta" : "Entrar"}</button>
    </form><button type="button" className="w-full text-sm underline" onClick={() => { setRegister(!register); setError(""); }}>{register ? "Ya tengo una cuenta" : "Crear una cuenta"}</button>
  </div>;
}
