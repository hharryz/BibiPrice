"use server";

import { signIn } from "@/auth";

export default async function requestAuth(email: string) {
  await signIn("resend", { email });
}
