import type { NextApiRequest, NextApiResponse } from 'next';

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export const withAdminAuth = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const adminToken = req.headers['x-admin-token']; // Or from environment variables, etc.
    const expectedAdminToken = process.env.ADMIN_TOKEN; // Store this securely in .env.local

    if (!adminToken || adminToken !== expectedAdminToken) {
      return res.status(401).json({ message: 'Unauthorized: Invalid Admin Token' });
    }

    return handler(req, res);
  };
};
