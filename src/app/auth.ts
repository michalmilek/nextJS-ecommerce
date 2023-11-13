import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { prismadb } from "@/libs/prisma";
import credentials from "next-auth/providers/credentials";
import Credentials from "@auth/core/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prismadb),
  session: { strategy: "jwt" },
});
