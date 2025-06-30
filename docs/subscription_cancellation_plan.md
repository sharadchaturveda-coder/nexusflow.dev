# Plan to Implement Secure Subscription Cancellation

This document outlines the plan for implementing a secure way for users to cancel their subscription from the `/billing` page.

## 1. Cancellation Mechanism:

*   **Approach:** A direct API call to Supabase will be used for managing subscription status. This will be orchestrated through a new Next.js API endpoint to ensure security (authentication, authorization, and server-side logic).
*   **Rationale:** This approach leverages the existing Supabase integration and provides full control over the cancellation logic, including handling different subscription states and potential refund policies. It avoids direct client-side interaction with payment gateway APIs for cancellation, enhancing security.

## 2. Backend/API Requirements:

*   **New API Endpoint:** Create a new API endpoint: `pages/api/user/cancel-subscription.ts`.
    *   **Method:** `POST`
    *   **Authentication:** Secure the endpoint using `getSession` from `next-auth/react` to ensure only authenticated users can initiate a cancellation.
    *   **Authorization:** Verify that the authenticated user is the owner of the subscription being cancelled.
    *   **Input:** The request body will likely be empty or contain a confirmation flag (e.g., `{ confirm: true }`).
    *   **Logic:**
        1.  Fetch the user's current subscription details from Supabase.
        2.  Update the `subscriptions` table to reflect the cancellation. This will involve changing the `status` field and setting a `cancellation_date`.
        3.  Handle different subscription states:
            *   If the subscription is `active`, set `status` to `pending_cancellation` and `cancellation_date` to the end of the current billing period. The user will retain access until this date.
            *   If the subscription is already `pending_cancellation`, prevent further cancellation attempts or allow immediate cancellation if desired (requires clarification on business logic).
            *   If the subscription is `cancelled`, return an appropriate message.
        4.  Consider integrating with a payment gateway (e.g., Razorpay, Stripe) to cancel recurring payments if applicable. This might involve calling their APIs from the backend. (Further investigation needed on Razorpay's subscription cancellation API).
        5.  Return a success or error response.
    *   **Error Handling:** Implement robust error handling for database operations, authentication/authorization failures, and external API calls.

## 3. Supabase Schema/Data Model:

*   **`subscriptions` table modifications:**
    *   Add a new column: `status` (type: `TEXT`, default: `'active'`). Possible values: `'active'`, `'pending_cancellation'`, `'cancelled'`, `'trialing'`, `'past_due'`.
    *   Add a new column: `cancellation_date` (type: `TIMESTAMP WITH TIME ZONE`, nullable). This will store the date when the subscription is effectively cancelled (e.g., end of current billing period).
    *   Add a new column: `payment_gateway_subscription_id` (type: `TEXT`, nullable). This will store the ID of the subscription in the payment gateway (e.g., Razorpay Subscription ID) to facilitate API calls for cancellation.

## 4. Frontend UI/UX:

*   **`pages/billing.tsx` modifications:**
    *   **Cancellation Button:** Add a "Cancel Subscription" button on the `/billing` page, ideally within the `PlanCard` component or near the subscription details.
    *   **Conditional Display:** The button should only be visible if the user has an active paid subscription.
    *   **Confirmation Dialog:** Upon clicking "Cancel Subscription," present a confirmation dialog (modal) to the user.
        *   **Message:** Clearly explain what cancellation means (e.g., "Your subscription will remain active until [next billing date] and will not renew after that.").
        *   **Options:** "Confirm Cancellation" and "Keep Subscription."
    *   **Loading State:** Show a loading indicator while the cancellation request is being processed.
    *   **Feedback Messages:**
        *   **Success:** Display a clear success message (e.g., "Your subscription has been successfully scheduled for cancellation. You will retain access until [cancellation date].").
        *   **Error:** Display an informative error message if cancellation fails.
    *   **UI Update:** After successful cancellation, update the UI to reflect the `pending_cancellation` status and the `cancellation_date`. The "Cancel Subscription" button should be replaced with a message indicating the pending cancellation or an option to "Reactivate Subscription" if applicable.
    *   **SWR Revalidation:** Use `mutate()` from SWR to re-fetch the subscription data after a successful cancellation request to update the UI.

## 5. Considerations:

*   **Handling Different Subscription States:**
    *   **Active:** Allow cancellation, set to `pending_cancellation`.
    *   **Pending Cancellation:** Display the effective cancellation date. Option to reactivate if desired.
    *   **Cancelled:** Display as cancelled, potentially with an option to resubscribe.
    *   **Refund Policies:** The plan does not currently include refund logic. This needs to be defined based on business rules. If refunds are applicable, the backend API would need to integrate with the payment gateway's refund API.
*   **Integration with External Services (Payment Gateway):**
    *   **Razorpay:** Investigate Razorpay's API for cancelling subscriptions. This will likely involve a server-to-server API call from our new backend endpoint. The `payment_gateway_subscription_id` in our Supabase `subscriptions` table will be crucial for this.
*   **Edge Cases:**
    *   What happens if a user tries to cancel a free plan? (Button should be hidden).
    *   What if the payment gateway cancellation fails but our database updates? (Need a robust retry mechanism or manual intervention process).
    *   What if the user has multiple subscriptions? (Current schema implies one per user, but if not, need to specify which to cancel).
*   **Security:**
    *   Always validate user input on the backend.
    *   Use server-side authentication and authorization for all sensitive operations.
    *   Log cancellation attempts for auditing and debugging.

```mermaid
sequenceDiagram
    participant User
    participant Frontend (Billing Page)
    participant Backend (Next.js API: /api/user/cancel-subscription)
    participant Supabase
    participant PaymentGateway (e.g., Razorpay)

    User->>Frontend: Clicks "Cancel Subscription"
    Frontend->>Frontend: Displays Confirmation Dialog
    User->>Frontend: Confirms Cancellation
    Frontend->>Backend: POST /api/user/cancel-subscription (authenticated)
    Backend->>Supabase: Fetch User Session
    Supabase-->>Backend: User Session Data
    Backend->>Supabase: Fetch current subscription (userId)
    Supabase-->>Backend: Subscription Data
    alt Subscription is Active
        Backend->>Supabase: Update 'subscriptions' table (status='pending_cancellation', cancellation_date=end_of_billing_period)
        Supabase-->>Backend: Update Success
        Backend->>PaymentGateway: Call Payment Gateway API to cancel recurring payments (using payment_gateway_subscription_id)
        PaymentGateway-->>Backend: Cancellation Confirmation
        Backend-->>Frontend: Success Response
        Frontend->>Frontend: Display Success Message & Update UI (SWR mutate)
    else Subscription already pending/cancelled
        Backend-->>Frontend: Informative Error/Success (already cancelled)
    end
    Frontend-->>User: Display Feedback