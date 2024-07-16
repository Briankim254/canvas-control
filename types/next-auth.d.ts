import NextAuth, { type DefaultSession } from "next-auth";
import type { verification, Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
  interface User {
    role: Role;
    verification: verification;
  }
}
