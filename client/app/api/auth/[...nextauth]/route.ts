import { UserDto } from "@/services/auth/dto";
import { signIn } from "@/services/auth/service";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        emailOrUsername: {
          label: "Username Or Email",
          type: "text",
          placeholder: "jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { emailOrUsername, password } = credentials as any;

        const res = await signIn({ emailOrUsername, password });
        const user = res.user;
        const accessToken = res.accessToken;
        if (accessToken && user) {
          const result = { ...user, accessToken };
          return result;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/error",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserDto;
      }
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
