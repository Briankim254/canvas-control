import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      verification: string;

    } & DefaultSession["user"];
  }
}

export const { auth, handlers } = NextAuth({
  callbacks: {
    session({ session, token, user }) {
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
