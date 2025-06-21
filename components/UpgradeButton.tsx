// components/UpgradeButton.tsx
import { useSession } from 'next-auth/react';

export default function UpgradeButton() {
  const { data: session } = useSession();

  const handlePayment = async () => {
    const res = await fetch('/api/payments/create-order', { method: 'POST' });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC_ for client-side vars
      amount: order.amount,
      currency: order.currency,
      name: "Nexus Flow AI",
      description: "Pro Plan Subscription",
      order_id: order.id,
      handler: function (response: any) { // Explicitly type response
        // Here you can verify the payment on the client side if needed,
        // but the primary verification is done via webhook.
        alert('Payment Successful!');
      },
      prefill: {
        email: session?.user?.email,
      },
      notes: {
        userId: session?.user?.id, // CRITICAL: Pass user ID to webhook
      },
      theme: {
        color: "#3399cc"
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Upgrade to Pro</button>;
}
