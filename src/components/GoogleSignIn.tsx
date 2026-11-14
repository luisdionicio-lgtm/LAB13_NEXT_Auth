"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

export default function GoogleSignIn({ configured }: { configured: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleGoogleSignIn() {
    setLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/dashboard" });
    } catch {
      setError("No se pudo conectar. Inténtalo nuevamente.");
      setLoading(false);
    }
  }
  return <>
    <button disabled={!configured || loading} onClick={handleGoogleSignIn} className="flex w-full items-center justify-center gap-2 rounded bg-gray-600 px-4 py-2 text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50">
      <FaGoogle aria-hidden="true" />{loading ? "Conectando…" : "Continue with Google"}
    </button>
    {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
  </>;
}
