import type { NextApiRequest, NextApiResponse } from 'next';

// Simple in-memory store for demonstration. In production, use Redis or similar.
const requestCounts = new Map<string, { count: number; lastReset: number }>();
const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // Max 10 requests per minute per IP

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export const withRateLimit = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    if (!ip || typeof ip !== 'string') {
      return res.status(500).json({ message: 'Internal Server Error: Could not determine IP address.' });
    }

    const now = Date.now();
    let entry = requestCounts.get(ip);

    if (!entry || (now - entry.lastReset > WINDOW_SIZE_MS)) {
      // Reset count if window expired or new IP
      entry = { count: 0, lastReset: now };
      requestCounts.set(ip, entry);
    }

    entry.count++;

    if (entry.count > MAX_REQUESTS) {
      return res.status(429).json({ message: 'Too Many Requests: Please try again later.' });
    }

    return handler(req, res);
  };
};
