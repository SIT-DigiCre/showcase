import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          hd: process.env.GOOGLE_HOSTED_DOMAIN,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // 大学メールアドレスかどうかの検証（例: メールアドレスの末尾が対象ドメインであるか）
      const email = user.email || "";
      if (email.endsWith(process.env.GOOGLE_HOSTED_DOMAIN!)) {
        return true;
      }
      return false;
    },
    async session({ session }) {
      // 必要に応じてセッションにユーザ情報を付与
      return session;
    },
  },
  // 必要に応じて、Drizzle ORM アダプターの設定も追加可能
} satisfies NextAuthConfig;

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
