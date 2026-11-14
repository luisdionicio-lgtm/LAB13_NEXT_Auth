import { NextResponse } from "next/server";
import { z } from "zod";
import { allowRegistration, registerAccount } from "@/lib/accounts";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) return NextResponse.json({ error: "Solicitud no permitida." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 4096) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
  try {
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for") || "unknown" : "local";
    if (!await allowRegistration(ip)) return NextResponse.json({ error: "Demasiados registros. Inténtalo en una hora." }, { status: 429 });
    const text = await request.text();
    if (text.length > 4096) return NextResponse.json({ error: "Solicitud demasiado grande." }, { status: 413 });
    let input;
    try { input = JSON.parse(text); } catch { return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 }); }
    if (!await registerAccount(input)) return NextResponse.json({ error: "No se pudo registrar este correo. Si ya tienes cuenta, inicia sesión." }, { status: 409 });
    return NextResponse.json({ message: "Tu lugar en el refugio está listo." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues[0]?.message || "Revisa tus datos." }, { status: 400 });
    console.error("Registration unavailable", error instanceof Error ? error.name : "Error");
    return NextResponse.json({ error: "El registro no está disponible temporalmente." }, { status: 503 });
  }
}
