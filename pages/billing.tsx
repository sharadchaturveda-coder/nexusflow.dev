import SubscriptionCard from '../components/account/SubscriptionCard';
import { useUserProTrialActivation } from '@/lib/hooks/useUserProTrialActivation';
import { useBillingData } from '@/lib/hooks/useBillingData';
import BillingLayout from '../components/billing/BillingLayout';

const BillingPage: React.FC = () => {
  const { handleActivateProTrial } = useUserProTrialActivation();
  const { subscription, loading, error } = useBillingData();

  if (loading) {
    return (
      <BillingLayout title="Nexus Flow AI - Billing" description="Nexus Flow AI Billing Page">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Loading...</h1>
        <p className="text-gray-500">Loading subscription data...</p>
      </BillingLayout>
    );
  }

  if (error) {
    return (
      <BillingLayout title="Nexus Flow AI - Billing" description="Nexus Flow AI Billing Page">
        <h1 className="text-3xl font-bold text-red-600 mb-6">Error</h1>
        <p className="text-red-600">{error}</p>
      </BillingLayout>
    );
  }

  return (
    <BillingLayout title="Nexus Flow AI - Billing" description="Nexus Flow AI Billing Page">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Your Subscription</h1>
      {subscription ? (
        <SubscriptionCard
          plan={subscription.plan}
          tokensUsed={subscription.tokensUsed}
          tokenLimit={subscription.tokenLimit}
          onActivateProTrial={handleActivateProTrial}
        />
      ) : (
        <p className="text-gray-500">No subscription data available.</p>
      )}
    </BillingLayout>
  );
};

export default BillingPage;
