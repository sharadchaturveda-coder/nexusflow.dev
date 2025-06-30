# Plan to Integrate "Next Billing Date" on /billing page

## 1. Data Source Identification

The "next billing date" will originate from the Supabase `subscriptions` table. We will add a new column to this table to store this information.

*   **Proposed Column:** `next_billing_date`
*   **Data Type:** `timestamp with time zone` (to handle time zones correctly)

## 2. Backend/API Modifications

This involves updating the Supabase schema and modifying the existing API endpoint that serves billing data.

*   **Supabase Schema Update:**
    *   Add the `next_billing_date` column to the `subscriptions` table in Supabase. This can be done via the Supabase UI or a migration script.
    *   Example SQL (if using a migration):
        ```sql
        ALTER TABLE subscriptions
        ADD COLUMN next_billing_date timestamptz;
        ```
*   **API Endpoint Modification (`pages/api/user/subscription.ts`):**
    *   Modify the `handler` function to fetch the `next_billing_date` from the `subscriptions` table.
    *   Include this new field in the JSON response sent to the frontend.

    ```typescript
    // pages/api/user/subscription.ts
    // ... existing imports and code ...

    export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      // ... existing session and user ID checks ...

      const userId = session.user.id;

      // 1. Fetch User Data (plan) and Subscription Data (including next_billing_date)
      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('plan, "tokenLimit", next_billing_date') // Add next_billing_date here
        .eq('"userId"', userId)
        .single();

      if (subscriptionError && subscriptionError.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error fetching subscription data:', subscriptionError);
        // Handle error appropriately, maybe return a default free plan
      }

      const planName = subscriptionData?.plan || 'Free';
      const nextBillingDate = subscriptionData?.next_billing_date || null; // Get the date

      // ... existing usage data fetching and calculation ...

      // 3. Construct Response
      const response = {
        planName,
        tokensUsed,
        tokensAvailable,
        nextBillingDate, // Include the new field
        billingHistory: [],
      };

      return res.status(200).json(response);
    }
    ```

## 3. Frontend Data Fetching

The `pages/billing.tsx` already uses `useSWR` to fetch data from `/api/user/subscription`. Once the API is updated, the `data` object returned by `useSWR` will automatically contain the `nextBillingDate`. No direct changes are needed to `lib/hooks/useBillingData.ts` as it's not the primary data source for `pages/billing.tsx`.

*   **`pages/billing.tsx`:** The `data` object will be destructured to include `nextBillingDate`.

    ```typescript
    // pages/billing.tsx
    // ... existing imports ...

    const BillingPage: React.FC = () => {
      const { status } = useAuthStatus();
      const { data, error, mutate } = useSWR('/api/user/subscription', fetcher);

      // ... loading and error states ...

      if (!data) {
        return (
          <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
            <div className="text-center py-10">Loading billing data...</div>
          </BillingLayout>
        );
      }

      const { subscription, usage, billingHistory, nextBillingDate } = data; // Destructure nextBillingDate

      // ... rest of the component ...
    };
    ```

## 4. UI Integration (`pages/billing.tsx`)

The "next billing date" will be displayed prominently on the billing page, likely within the `PlanCard` or as a separate section.

*   **Display Location:** A good place would be below the `PlanCard` or within a new dedicated section for subscription details.
*   **Formatting:** The date should be formatted for user readability (e.g., "July 15, 2025").

    ```typescript
    // pages/billing.tsx
    // ... inside the return statement of BillingPage component ...
    return (
      <BillingLayout title="Billing" description="Manage your subscription and view billing history.">
        <div className="space-y-8">
          <PlanCard
            planName={subscription?.planName || 'Free'}
            description={subscription?.description || 'Your current plan details.'}
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
    ```

## 5. Considerations

*   **Updating `next_billing_date`:** The most critical consideration is how this date will be populated and updated in the Supabase `subscriptions` table. This typically happens via:
    *   **Payment Gateway Webhooks:** When a subscription payment is successful, the payment gateway (e.g., Razorpay, Stripe) sends a webhook. The `pages/api/payments/webhook.ts` endpoint should be extended to process these webhooks and update the `next_billing_date` for the user's subscription.
    *   **Manual Calculation/Admin Tool:** For initial setup or edge cases, an admin tool might be needed to manually set or adjust this date.
*   **Time Zone Handling:** Ensure that dates are stored in UTC in the database and converted to the user's local time for display on the frontend to avoid confusion. The `toLocaleDateString` method handles this client-side.
*   **Edge Cases:**
    *   **No Subscription:** If a user has no active subscription (e.g., on a free plan), `nextBillingDate` might be `null`. The UI should gracefully handle this (e.g., by not displaying the section or showing "N/A").
    *   **Subscription Cancellation/Expiration:** The system needs a mechanism to update or clear `next_billing_date` if a subscription is canceled or expires.
*   **Error Handling:** Implement robust error handling in the API and frontend to gracefully manage scenarios where the `next_billing_date` cannot be fetched or is invalid.

### Flow Diagram

```mermaid
graph TD
    A[User navigates to /billing] --> B{pages/billing.tsx};
    B --> C[useSWR calls /api/user/subscription];
    C --> D[pages/api/user/subscription.ts];
    D --> E[Fetch data from Supabase subscriptions table];
    E --> F{Supabase subscriptions table};
    F -- next_billing_date --> E;
    E --> G[API returns subscription data including nextBillingDate];
    G --> H[pages/billing.tsx receives data];
    H --> I[Display nextBillingDate on UI];
    I --> J[User sees next billing date];

    subgraph Backend Updates
        F -- Add next_billing_date column --> K[Supabase Schema];
        K --> D;
    end

    subgraph Data Update Mechanism
        L[Payment Gateway Webhook] --> M[pages/api/payments/webhook.ts];
        M --> N[Update next_billing_date in Supabase];
        N --> F;
    end