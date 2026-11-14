import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AuthForm from "@/components/AuthForm";
export default async function SignInPage() {
  if (await getServerSession(authOptions)) redirect("/dashboard");
  return <div className="auth-screen"><div className="auth-poster"><div className="auth-poster-content"><p className="eyebrow"><span className="pulse" /> TRANSMISIÓN ACTIVA · ZONA SEGURA</p><div><p className="auth-tag">UN UNIVERSO DE SUPERVIVENCIA</p><h1>THE<br/><span>WALKING</span><br/>DEAD<span className="auth-dot">.</span></h1><div className="auth-line"/><p>EL MUNDO CAMBIÓ.<br/>NOSOTROS SEGUIMOS AQUÍ.</p></div><p className="auth-bottom">01 / EL REFUGIO <span>PROYECTO ACADÉMICO DE FANS</span></p></div></div><section className="auth-panel"><div className="auth-panel-inner"><p className="eyebrow"><span className="pulse"/> ACCESO AL REFUGIO</p><h2>El final es<br/><em>solo el comienzo.</em></h2><p className="auth-subtitle">Tu historia continúa aquí. Identifícate para entrar.</p><AuthForm google={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)} github={Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET)} /><p className="auth-footer">ZONA SEGURA · SOLO SUPERVIVIENTES</p></div></section></div>;
}
