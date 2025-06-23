// middleware/withQuotaCheck.ts (New version)
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../lib/supabaseClient'; // Adjust path if needed

export function withQuotaCheck(handler: (req: NextRequest, res: NextResponse) => Promise<NextResponse | Response>) {
  return async (req: NextRequest, res: NextResponse) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! });

    if (!token) {
      return new Response('Unauthorized', { status: 401 });
    }

    const user_id = token.sub; // `sub` is the standard JWT field for user ID

    const { data: subscription, error } = await supabase
        .from('subscriptions')
        .select('tokens_used, token_limit')
        .eq('user_id', user_id)
        .single();

    if (error || !subscription) {
      return new Response('Subscription not found.', { status: 403 });
    }

    if (subscription.tokens_used >= subscription.token_limit) {
      return new Response('Token limit exceeded.', { status: 429 });
    }

    // Attach user info to the request for the next handler
    (req as any).user = { id: user_id, subscription };
    return handler(req, res);
  };
}
