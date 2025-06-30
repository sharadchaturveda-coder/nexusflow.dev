import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]'; // Adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Protect the route: Only authenticated users can access
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    console.log('User wants to train on URL:', url);

    // For now, just return a success response.
    // In a real application, you would initiate the AI training process here.
    return res.status(200).json({ message: 'Training request received', url });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}