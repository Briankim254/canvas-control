import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
}) 