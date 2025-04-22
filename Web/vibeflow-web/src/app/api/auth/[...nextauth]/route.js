import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { createConn } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const db = await createConn();

      if (account?.provider === "google" || account?.provider === "facebook") {
        const provider = account.provider;
        const [existingUser] = await db.query(
          `SELECT id FROM users WHERE email = ? AND provider = ?`,
          [token.email, provider]
        );

        if (existingUser.length === 0) {
          const now = new Date().toISOString().slice(0, 19).replace("T", " ");
          await db.query(
            `INSERT INTO users (username, email, password, provider, createdAt)
             VALUES (?, ?, NULL, ?, ?)`,
            [token.name || token.email, token.email, provider, now]
          );
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
