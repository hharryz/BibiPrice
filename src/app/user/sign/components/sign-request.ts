"use server";

import { signIn } from "@/auth";

export async function authMagicLink(email: string) {
  await signIn("resend", { email });
}

export async function authPassword(email: string, password: string) {
  await signIn("credentials", { email, password });
}
