import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!body?.email || !body?.password) {
    throw new Error("Invalid credentials");
  }

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user || !user?.hashedPassword) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
}
