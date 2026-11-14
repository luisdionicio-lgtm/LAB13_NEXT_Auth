import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signIn");
  return <div className="refuge">
    <section className="hero">
      <div className="hero-inner"><p className="eyebrow"><span className="pulse" /> TRANSMISIÓN ACTIVA · ZONA SEGURA</p><p className="hero-kicker">THE WALKING DEAD / UN UNIVERSO DE SUPERVIVENCIA</p><h1>LOS QUE<br/><em>PERMANECEN.</em></h1><p className="hero-copy">El mundo cambió. Lo que nos mantiene humanos, no. Bienvenido al refugio, {session.user.name?.split(" ")[0] || "superviviente"}.</p><div className="hero-actions"><a className="primary-action" href="#historias">EXPLORAR EL UNIVERSO <span>↗</span></a><Link href="/profile" className="secondary-action">MI PERFIL →</Link></div></div>
      <div className="hero-bottom"><span>01 / EL REFUGIO</span><span>UN LUGAR PARA LOS QUE SIGUEN</span><span>↓ DESLIZA PARA EXPLORAR</span></div>
    </section>
    <section id="historias" className="stories"><div className="section-intro"><div><p className="eyebrow">EXPEDIENTES / 001 — 003</p><h2>La vida después<br/><em>del final.</em></h2></div><p>Historias de resistencia, vínculos imposibles y decisiones que definen quiénes somos cuando todo cambia.</p></div><div className="story-grid"><article className="story-card"><div className="story-image story-group"/><div className="story-meta"><span>01 / EL GRUPO</span><span>SUPERVIVENCIA</span></div><h3>Juntos, contra todo.</h3><p>En un mundo sin reglas, la comunidad es el último refugio.</p></article><article className="story-card"><div className="story-image story-rick"/><div className="story-meta"><span>02 / RICK Y MICHONNE</span><span>CONEXIÓN</span></div><h3>Los que luchan por volver.</h3><p>La esperanza persiste incluso en los caminos más oscuros.</p></article><article className="story-card"><div className="story-image story-daryl"/><div className="story-meta"><span>03 / DARYL DIXON</span><span>RESISTENCIA</span></div><h3>El camino continúa.</h3><p>Un superviviente, una ballesta y un mundo por descubrir.</p></article></div></section><footer className="refuge-footer"><span>THE WALKING DEAD / FAN EXPERIENCE</span><span>PROYECTO ACADÉMICO · NO OFICIAL</span></footer>
  </div>;
}
