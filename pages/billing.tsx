import React, { useState } from 'react';
import useSWR from 'swr';
import { useAuthStatus } from '../lib/hooks/useAuthStatus.ts';
import BillingLayout from '../components/billing/BillingLayout.tsx';
import PlanCard from '../components/billing/PlanCard.tsx';
import UsageMeter from '../components/billing/UsageMeter.tsx';
import BillingHistoryTable from '../components/billing/BillingHistoryTable.tsx';
import loadRazorpayScript from '../lib/razorpay/loadRazorpayScript.ts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BillingPage: React.FC = () => {
  const { status } = useAuthStatus();
  const { data, error, mutate } = useSWR('/api/user/subscription', fetcher);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancellationMessage, setCancellationMessage] = useState('');
  const [cancellationError, setCancellationError] = useState('');

  if (status === 'loading') {
    return (
      <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
        <div className="text-center py-10">Loading authentication status...</div>
      </BillingLayout>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
        <div className="text-center py-10 text-red-500">
          You must be logged in to view this page.
        </div>
      </BillingLayout>
    );
  }

  if (error) {
    return (
      <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
        <div className="text-center py-10 text-red-500">
          Failed to load billing data: {error.message}
        </div>
      </BillingLayout>
    );
  }

  if (!data) {
    return (
      <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
        <div className="text-center py-10">Loading billing data...</div>
      </BillingLayout>
    );
  }

  const { subscription, usage, billingHistory, nextBillingDate } = data; // Destructure nextBillingDate
  const isProPlan = subscription?.planName === 'Pro';
  const isPendingCancellation = subscription?.status === 'pending_cancellation';
  const effectiveCancellationDate = subscription?.cancellation_date;

  const handleCancelSubscription = async () => {
    setShowCancelConfirm(false); // Close confirmation dialog
    setIsCancelling(true);
    setCancellationMessage('');
    setCancellationError('');

    try {
      const res = await fetch('/api/user/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();

      if (res.ok) {
        setCancellationMessage(result.message);
        mutate(); // Re-fetch subscription data to update UI
      } else {
        setCancellationError(result.message || 'Failed to cancel subscription.');
      }
    } catch (err: any) {
      console.error('Error cancelling subscription:', err);
      setCancellationError(err.message || 'An unexpected error occurred during cancellation.');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleUpgradeClick = async () => {
    try {
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 99900, currency: 'INR' }), // Example amount
      });

      const { orderId, key } = await res.json();

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert('Razorpay SDK failed to load. Are you connected to the internet?');
        return;
      }

      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: 99900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 means 50000 paise or ₹500.
        currency: 'INR',
        name: 'Nexus Flow AI',
        description: 'Pro Plan Upgrade',
        order_id: orderId, // Order ID from backend
        handler: async function (response: any) {
          try {
            const verificationRes = await fetch('/api/payments/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            if (verificationRes.ok) {
              alert('Payment successfully verified! Your plan has been updated.');
              // Re-fetch subscription data to update UI
              mutate(); // Re-fetch subscription data to update UI
            } else {
              const errorData = await verificationRes.json();
              alert(`Payment verification failed: ${errorData.message || 'Unknown error'}`);
            }
          } catch (error) {
            console.error('Error during payment verification:', error);
            alert('An error occurred during payment verification. Please try again.');
          }
        },
        prefill: {
          name: 'Customer Name', // Optional
          email: 'customer@example.com', // Optional
          contact: '9999999999', // Optional
        },
        notes: {
          address: 'Razorpay Corporate Office', // Optional
        },
        theme: {
          color: '#3399CC', // Optional
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Error initiating Razorpay checkout:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
      <div className="space-y-8">
        <PlanCard
          plan={{
            id: subscription?.planId || 'free',
            name: subscription?.planName || 'Free',
            price: 'N/A', // Placeholder, as price might not be directly available here
            keyLimit: 'N/A', // Placeholder
            features: [], // Placeholder
            button: 'Manage Subscription', // Placeholder
          }}
        />

        {nextBillingDate && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Billing Date</h3>
            <p className="text-gray-700">
              Your next billing date is:{' '}
              <span className="font-medium text-blue-600">
                {new Date(nextBillingDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </p>
          </div>
        )}

        {isProPlan && !isPendingCancellation && (
          <button
            onClick={() => setShowCancelConfirm(true)}
            className="mt-4 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            disabled={isCancelling}
          >
            {isCancelling ? 'Cancelling...' : 'Cancel Subscription'}
          </button>
        )}

        {isPendingCancellation && effectiveCancellationDate && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p className="font-bold">Cancellation Pending</p>
            <p>Your subscription is scheduled for cancellation on{' '}
              {new Date(effectiveCancellationDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}. You will retain access until then.
            </p>
          </div>
        )}

        {cancellationMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p>{cancellationMessage}</p>
          </div>
        )}

        {cancellationError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{cancellationError}</p>
          </div>
        )}

        {showCancelConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Confirm Subscription Cancellation</h3>
              <p className="text-gray-700 mb-6">
                Are you sure you want to cancel your subscription? Your subscription will remain active until{' '}
                {nextBillingDate ? new Date(nextBillingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'your next billing date'}
                {' '}and will not renew after that.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Keep Subscription
                </button>
                <button
                  onClick={handleCancelSubscription}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleUpgradeClick}
          className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upgrade to Pro
        </button>
        <UsageMeter
          tokensUsed={usage?.tokensUsed || 0}
          tokensAvailable={usage?.tokensAvailable || 'unlimited'}
        />
        <BillingHistoryTable billingHistory={billingHistory || []} />
      </div>
    </BillingLayout>
  );
};

export default BillingPage;
