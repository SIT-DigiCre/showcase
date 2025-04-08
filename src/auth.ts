import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { env } from "./env";
import { userTable, accountTable, sessionTable } from "./db/schema";
import db from "./db";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db, {
    usersTable: userTable,
    accountsTable: accountTable,
    sessionsTable: sessionTable,
  }),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      profile: (profile) => {
        return {
          ...profile,
          role: "user",
          image: profile.picture,
          slug: profile.email.split("@")[0],
        };
      },
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
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const [user] = await db
        .select()
        .from(userTable)
        .where(eq(userTable.id, token.sub))
        .limit(1);
      if (!user) {
        return token;
      }
      token.user = user;
      token.id = user.id;
      token.role = user.role;
      token.slug = user.slug;

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub as string,
          role: token.role as string,
          slug: token.slug as string,
        },
      };
    },
  },
});
