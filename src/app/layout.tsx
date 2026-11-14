import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Provider from "@/components/SessionProvider";
import "./globals.css";

export const metadata: Metadata = { title: "El Refugio | The Walking Dead", description: "Laboratorio 13: autenticación con Google y NextAuth.js" };

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es">
      <body className="antialiased">
        <Provider session={session}>
          <nav className="bg-black text-white shadow-sm">
            <div className="site-nav mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
              <Link href="/" className="text-xl font-semibold">THE WALKING DEAD <span className="nav-small">/ EL REFUGIO</span></Link>
              <ul className="site-nav-links flex flex-wrap items-center gap-6 text-sm">
                <li><Link href="/dashboard" className="hover:text-gray-400">Dashboard</Link></li>
                {session?.user && <>
                  <li><Link href="/profile" className="hover:text-gray-400">Profile</Link></li>
                  <li><LogoutButton /></li>
                  {session.user.image && <li><Image src={session.user.image} alt="Foto de perfil" width={40} height={40} className="rounded-full" /></li>}
                </>}
              </ul>
            </div>
          </nav>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
