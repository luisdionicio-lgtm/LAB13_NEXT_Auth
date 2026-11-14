import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signIn");
  const provider = session.provider === "github" ? "GitHub" : session.provider === "credentials" ? "Correo y contraseña" : "Google";
  return <div className="profile-page"><div className="profile-wrap">
    <div className="profile-heading"><div><p className="eyebrow"><span className="pulse"/> ARCHIVO DEL REFUGIO / PERSONAL</p><h1>Tu historia <em>continúa.</em></h1><p>Cada superviviente tiene una historia. Esta es tu identificación en el refugio.</p></div><Link className="secondary-action" href="/dashboard">← VOLVER AL REFUGIO</Link></div>
    <div className="profile-grid"><section className="identity-card"><div className="id-top"><span>EXPEDIENTE / 001</span><span>● ACCESO ACTIVO</span></div><div className="identity-main">{session.user.image ? <Image src={session.user.image} alt="Foto de perfil" width={96} height={96} className="identity-avatar"/> : <div className="identity-avatar identity-placeholder">{(session.user.name || "S").charAt(0).toUpperCase()}</div>}<div><p className="eyebrow">SUPERVIVIENTE</p><h2>{session.user.name || "Miembro del refugio"}</h2><p>Identidad confirmada</p></div></div><dl className="identity-details"><div><dt>NOMBRE</dt><dd>{session.user.name || "Sin nombre"}</dd></div><div><dt>CORREO</dt><dd>{session.user.email || "No disponible"}</dd></div><div><dt>FORMA DE ACCESO</dt><dd>{provider}</dd></div></dl><div className="id-bottom"><span>THE WALKING DEAD</span><span>REFUGIO / ACCESO PERSONAL</span></div></section>
    <aside className="profile-aside"><p className="eyebrow">NOTA DEL REFUGIO / 01</p><h3>La fuerza está<br/><em>en el grupo.</em></h3><p>En este mundo, cada persona cuenta. Explora las historias del refugio y recuerda: nadie sobrevive solo.</p><Link href="/dashboard#historias">EXPLORAR HISTORIAS ↗</Link></aside></div>
  </div></div>;
}
