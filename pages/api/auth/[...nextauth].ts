// pages/api/auth/[...nextauth].ts

// Import from 'next-auth', NOT '@auth/core'
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import PgAdapter from "@auth/pg-adapter"; // Corrected import
import { Pool } from "pg";

// Create a new connection pool to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Define your authentication options in a constant
export const authOptions = {
  adapter: PgAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Add this secret property
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Ensure the user's ID is attached to the session
    session({ session, user }: { session: any, user: any }) {
      session.user.id = user.id;
      return session;
    },
  },
};

// The default export is the NextAuth handler, which correctly handles req and res
export default NextAuth(authOptions);
