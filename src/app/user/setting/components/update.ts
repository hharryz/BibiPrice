"use server"

import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/password";
import { updateSchema } from "@/lib/zod";
import { ZodError } from "zod";
import { auth } from "@/auth";


export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default async function updateForm(formData: FormData) {
  const session = await auth()
  if (!session) {
    throw new Error('Not authenticated');
  }
  if (formData.email !== session.user?.email) {
    throw new Error('Email does not match');
  }
  if (formData.password !== formData.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  try {
    const { username, email, password } = await updateSchema.parseAsync(formData);

    const hash = await saltAndHashPassword(password);
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        name: username,
        hashPassword: hash,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error('Invalid form data');
    }
    if (error instanceof Error) {
      throw new Error('Error updating!');
    }
  }
}