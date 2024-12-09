"use server";

import { signIn } from "@/auth";
import exp from "constants";

export async function authMagicLink(email: string) {
  await signIn("resend", { email });
}

export async function authPassword(email: string, password: string) {
  console.log(email, password)
  await signIn("credentials", { email, password });
}

