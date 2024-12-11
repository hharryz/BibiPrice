import NextAuth from "next-auth";
import authConfig from "./auth.config";

import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

import Resend from "next-auth/providers/resend";

import { sendAuthRequest } from "./lib/mail";

const combinedProviders = [
  ...authConfig.providers,
  Resend({
    from: "bibiprice@uqbarz.com",
    sendVerificationRequest: sendAuthRequest,
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: combinedProviders,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    // signIn: "/user/sign",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
});
