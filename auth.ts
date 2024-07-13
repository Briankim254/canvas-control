import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Resend from "next-auth/providers/resend";
import prisma from "./prisma/client";
import GitHub from "next-auth/providers/github";
import resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Resend({
      from: "Auth@kimutai.xyz",
    }),
  ],
});
