import NextAuth from "next-auth";
import authConfig from "./auth.config";

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter"

import Resend from "next-auth/providers/resend"

const combinedProviders = [
    ...authConfig.providers,
    Resend({
        from: 'bibiprice@uqbarz.com',
    }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: combinedProviders,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    // ...authConfig,
  });