import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createConn } from "@/lib/db";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        const db = await createConn();
        const [existingUser] = await db.query(
          `SELECT id FROM users WHERE email = ? AND provider = 'google'`,
          [token.email]
        );

        if (existingUser.length === 0) {
          const now = new Date().toISOString().slice(0, 19).replace("T", " ");
          await db.query(
            `INSERT INTO users (username, email, password, provider, createdAt)
             VALUES (?, ?, NULL, 'google', ?)`,
            [token.name || token.email, token.email, now]
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
