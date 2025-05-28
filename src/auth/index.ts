import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { getPlayerById } from "@/services/actions";
import { PlayerMapper } from "@/utils/mappers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ account, profile, credentials, user, email }) {
      console.log("🚀 ~ signIn:", {
        account,
        profile,
        credentials,
        user,
        email
      });

      return true;
    },
    async session({ session, token }) {
      const profile = await getPlayerById(token.email as string);

      const user = PlayerMapper.toDomain({ ...session.user, ...profile });

      return { ...session, token, user };
    }
  }
});
