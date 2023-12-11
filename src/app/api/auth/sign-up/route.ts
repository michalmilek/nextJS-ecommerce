import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import { prismadb } from "@/libs/prisma";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      console.log(email, password);
      return new NextResponse("All fields are required", { status: 400 });
    }

    const user = await prismadb.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      return new NextResponse("User with provided username already exists.", {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prismadb.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
