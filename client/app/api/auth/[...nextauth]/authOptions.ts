import { UserDto } from "@/services/auth/dto";
import { refreshAccessToken, signIn } from "@/services/auth/service";
import { getUser } from "@/services/users/service";
import { AuthOptions } from "next-auth";

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
        const accessTokenExpiresIn = res.accessTokenExpiresIn;
        if (accessToken && user) {
          const result = { ...user, accessToken, accessTokenExpiresIn };
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
      if (
        token.user.accessTokenExpiresIn &&
        Date.now() / 1000 > token.user.accessTokenExpiresIn
      ) {
        const res = await refreshAccessToken();
        const data = await res.json();

        if (res.ok) {
          token.user.accessToken = data.accessToken;
          token.user.accessTokenExpiresIn = data.accessTokenExpiresIn;
        } else {
          // Handle the error
        }
      }

      return token;
    },

    async session({ token, session }) {
      const user = await getUser(token.user.accessToken, token.user.id);
      const result = { ...token.user, ...user.data };

      session.user = result;
      return session;
    },
  },
};
