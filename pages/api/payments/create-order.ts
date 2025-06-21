// pages/api/payments/create-order.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ error: 'Unauthorized' });

  // Example: Pro plan for ₹999
  const options = {
    amount: 99900, // Amount in the smallest currency unit (paise)
    currency: "INR",
    receipt: `receipt_user_${session.user.id}_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
}
