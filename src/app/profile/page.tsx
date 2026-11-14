import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signIn");
  return <div className="min-h-[calc(100vh-80px)] bg-gray-100 p-8">
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-4 text-3xl font-bold text-gray-900">Profile</h1>
      <p className="mb-2 text-gray-700">Name: <span className="font-semibold">{session.user.name}</span></p>
      <p className="mb-2 text-gray-700">Email: <span className="font-semibold">{session.user.email}</span></p>
      {session.user.image && <>
        <p className="mt-4 text-gray-700">Image Profile:</p>
        <Image src={session.user.image} alt="Foto de perfil" width={100} height={100} className="mt-4 h-16 w-16 rounded-full" />
      </>}
    </div>
  </div>;
}
