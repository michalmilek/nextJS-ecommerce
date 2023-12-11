import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

import { prismadb } from "./prisma";

import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error(
              JSON.stringify({ error: "Provide credentials", status: false })
            );
          }

          const user = await prismadb.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (
            !user ||
            !(await compare(credentials.password, user.password as string))
          ) {
            throw new Error(
              JSON.stringify({ error: "Wrong password", status: false })
            );
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            randomKey: "Hey cool",
          };
        } catch (error) {
          throw new Error("Wrong credentials");
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
};
