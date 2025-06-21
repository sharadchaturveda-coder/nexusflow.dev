import NextAuth from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import GoogleProvider from 'next-auth/providers/google'; // Example provider

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Add these to your .env.local
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // Add other providers like Email, GitHub etc. if needed
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user }: { session: any, user: any }) {
      // Add the user's ID to the session object
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Add custom pages if you want to style them
  // pages: {
  //   signIn: '/auth/signin',
  // },
};

export default NextAuth(authOptions);
