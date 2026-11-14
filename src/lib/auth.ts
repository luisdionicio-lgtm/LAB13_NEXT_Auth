import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateAccount } from "./accounts";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({ clientId: process.env.GOOGLE_CLIENT_ID ?? "", clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "" }),
    GitHubProvider({ clientId: process.env.GITHUB_ID ?? "", clientSecret: process.env.GITHUB_SECRET ?? "" }),
    CredentialsProvider({
      name: "Credenciales del refugio",
      credentials: { email: { label: "Correo", type: "email" }, password: { label: "Contraseña", type: "password" } },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        return authenticateAccount(credentials.email, credentials.password);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: { signIn: "/signIn", error: "/signIn" },
  callbacks: {
    async jwt({ token, account }) { if (account) token.provider = account.provider; return token; },
    async session({ session, token }) { session.provider = typeof token.provider === "string" ? token.provider : "google"; return session; },
  },
};
