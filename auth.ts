import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Resend from "next-auth/providers/resend";
import prisma from "./prisma/client";
import type { Adapter } from "next-auth/adapters";
import { type DefaultSession } from "next-auth";
import type { verification, Role } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Resend({
      from: "Auth@kimutai.xyz",
      name: "email",
    }),
  ],
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role,
          verification: user.verification,
        },
      };
    },
  },
});
