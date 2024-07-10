import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface session {
        user: User & DefaultSession["user"]
    }

    interface user {
        role: string |null;
    }
}