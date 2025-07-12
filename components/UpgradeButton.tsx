// components/UpgradeButton.tsx
import { useSession } from 'next-auth/react';

interface UpgradeButtonProps {
  planId: string;
  buttonText: string;
}

export default function UpgradeButton({ planId, buttonText }: UpgradeButtonProps) {
  const { data: session } = useSession();

  const handlePayment = async () => {
    const res = await fetch('/api/payments/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }), // Pass planId to the API
    });
    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Use NEXT_PUBLIC_ for client-side vars
      amount: order.amount,
      currency: order.currency,
      name: "Nexus Flow AI",
      description: `${planId} Plan Subscription`, // Dynamic description
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
        user_id: session?.user?.id, // CRITICAL: Pass user ID to webhook
        plan_id: planId, // Pass planId to webhook
      },
      theme: {
        color: "#3399cc"
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
    >
      {buttonText}
    </button>
  );
}
