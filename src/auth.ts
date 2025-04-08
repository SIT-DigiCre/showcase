import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createUserIfNotExists } from "@/db/actions";
import { env } from "./env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        // 学番ドメイン以外はログインさせない
        if (!profile || !profile.email?.endsWith("@shibaura-it.ac.jp")) {
          console.log("Invalid email domain");
          return false;
        }
        // usersテーブルに同じアドレスが存在しない場合はレコードを追加
        await createUserIfNotExists({
          email: profile.email,
          name: profile.nickname || profile.name || "Unkown",
          icon_url: profile.picture,
        });
      }
      return true;
    },
  },
});
