import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { signInWithCredential, GoogleAuthProvider, User } from "firebase/auth";

import { getPlayerById } from "@/services/actions";
import { PlayerMapper } from "@/utils/mappers";
import { firebaseAuth } from "@/services/clients/firebaseClient";

function extractTokensFromStsTokenManager(user: User) {
  // @ts-expect-error this key exists in the Firebase user object
  const { accessToken, refreshToken } = user.stsTokenManager;

  return {
    accessToken,
    refreshToken
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || ""
    })
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === "google" && account?.id_token) {
        try {
          // Criar uma credencial do Firebase com o token do Google
          const credential = GoogleAuthProvider.credential(account.id_token);

          // Fazer login no Firebase
          const firebaseUser = await signInWithCredential(
            firebaseAuth,
            credential
          );

          const { accessToken, refreshToken } =
            extractTokensFromStsTokenManager(firebaseUser.user);

          // @ts-expect-error is possible to set custom properties on the account object
          account.accessToken = accessToken;

          // @ts-expect-error is possible to set custom properties on the account object
          account.refresh_token = refreshToken;

          // TODO: Verificar se o usuário existe em /players e criar se não existir
          return true;
        } catch (error) {
          console.error("Erro ao autenticar no Firebase:", error);
          return false;
        }
      }

      return false;
    },
    async jwt({ account, token }) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refresh_token;
      }

      return token;
    },
    async session({ session, token }) {
      const { accessToken, refreshToken } = token;

      const profile = await getPlayerById(token.email as string);

      const user = PlayerMapper.toDomain({
        ...session.user,
        ...profile
      } as PlayerDTO);

      return { ...session, accessToken, refreshToken, user };
    }
  }
});
