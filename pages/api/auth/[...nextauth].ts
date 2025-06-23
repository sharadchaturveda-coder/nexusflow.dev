// pages/api/auth/[...nextauth].ts
import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PgAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const authOptions = {
  adapter: PgAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session({ session, user }: { session: Session; user: User }) {
      session.user.id = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
