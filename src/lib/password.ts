import bcrypt from 'bcryptjs';
import prisma from './prisma';

const saltRounds = 10;

export async function saltAndHashPassword(password : string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
    throw new Error('Error hashing password');
  }
}

export async function verifyPassword(password : string, hash : string) {
  try {
    const isValid = await bcrypt.compare(password, hash);
    return isValid;
  } catch (error) {
    console.error(error);
    throw new Error('Error verifying password');
  }
}

export const getUserFromDb = async (email : string, password : string) => {
  const user = await prisma.user.findUnique({
    where: {
      email : email,
    },
  });

  if (!user) {
    console.log('User not found in db');
    return null;
  } else if (!user.hashPassword) {
    console.log('User does not have a password');
    return null;
  }

  const isValid = await verifyPassword(password, user.hashPassword);

  if (!isValid) {
    console.log('Password is incorrect');
    return null;
  }

  // logic to verify if the user exists
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    image: user.image,
  }
}