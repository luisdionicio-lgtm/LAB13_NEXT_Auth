import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AuthForm from "@/components/AuthForm";
export default async function SignInPage() {
  if (await getServerSession(authOptions)) redirect("/dashboard");
  return <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-100 px-6 py-12"><section className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md"><h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Iniciar sesión</h1><AuthForm google={Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)} github={Boolean(process.env.GITHUB_ID && process.env.GITHUB_SECRET)} /></section></div>;
}
