import type { NextApiRequest, NextApiResponse } from 'next';
import Razorpay from 'razorpay';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    console.error('Razorpay API keys are not set in environment variables.');
    return res.status(500).json({ message: 'Server configuration error: Razorpay keys missing.' });
  }

  const razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });

  try {
    const amount = 99900; // Amount in paisa (e.g., 99900 for ₹999.00)
    const currency = 'INR';
    const receipt = `receipt_order_${session.user.id}_${Date.now()}`;

    const options = {
      amount: amount,
      currency: currency,
      receipt: receipt,
      notes: {
        userId: session.user.id,
        plan: 'Pro',
      },
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      orderId: order.id,
      RAZORPAY_KEY_ID: RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Failed to create Razorpay order.' });
  }
}
