import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDb } from "@/lib/password";
import { ZodError } from "zod";
import { signInSchema } from "@/lib/zod";

export default {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;
          //  zod schema validation
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // logic to verify if the user exists
          user = await getUserFromDb(email, password);
          console.log(
            "[Authenticating User By Email - Password], user info: ",
            user
          );
          if (!user) {
            throw new Error(`User not found. If it's your first time logging in,
                             please register via email magic link.`);
          }

          // return JSON object with the user data
          return user;
        } catch (error) {
          console.log(
            "[Error Authenticating User By Email - Password], error info: ",
            error
          );
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
