import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import GoogleSignIn from "@/components/GoogleSignIn";

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (await getServerSession(authOptions)) redirect("/dashboard");
  const { error } = await searchParams;
  const configured = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-gray-100 px-6">
      <section className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">Sign In</h1>
        {error && <p role="alert" className="mb-4 text-sm text-red-700">No se pudo iniciar sesión con Google. Vuelve a intentarlo o revisa la configuración OAuth.</p>}
        <GoogleSignIn configured={configured} />
      </section>
    </div>
  );
}
