"use server"

import prisma from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/password";


export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default async function updateForm(formData: FormData) {
    console.log("BUtton Clicked");
  console.log(formData);
  if (formData.password !== formData.confirmPassword) {
    throw new Error('Passwords do not match');
  }
  const hash = await saltAndHashPassword(formData.password);
    console.log(hash);
    prisma.user.update({
        where: {
            email: formData.email,
        },
        data: {
            name: formData.username,
            hashPassword: hash,
        },
    }).catch((error) => {
        throw new Error(error);
    }
    );
}