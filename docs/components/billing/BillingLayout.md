# `BillingLayout` Component

This component provides a consistent layout for the billing page, including SEO metadata, the navigation bar, and a main content area.

## Props

*   `children`: The content to be rendered within the layout.
*   `title` (string): The title for the page's SEO.
*   `description` (string): The meta description for the page's SEO.

## Usage

```typescript
import BillingLayout from '@/components/billing/BillingLayout';

<BillingLayout title="My Billing" description="Manage your billing details.">
  {/* Page content here */}
</BillingLayout>
