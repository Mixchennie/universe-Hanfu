// src/app/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from '../../utils/auth';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const user = await loginUser(credentials.username, credentials.password);

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error"
  }
});
