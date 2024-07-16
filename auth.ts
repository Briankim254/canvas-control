import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import prisma from "./prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: "Auth@kimutai.xyz",
      name: "email",
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      session.user.verification = user.verification;
      return session;
    },
  },
});
