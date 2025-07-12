# Pages

This document describes the structure and purpose of the main pages within the application, located in the `pages/` directory.

## Overview

Next.js pages are React components exported from files in the `pages/` directory. Each file typically corresponds to a route in the application.

## Common Page Structure

A typical page component might include:

*   **Imports:** React, Next.js specific components (e.g., `Head`), and custom components.
*   **`getServerSideProps` or `getStaticProps` (Optional):** Functions for data fetching at build time or request time.
*   **Page Component:** The default exported React component for the page.

```tsx
// Example: pages/dashboard/index.tsx
import { GetServerSideProps } from 'next';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardContent from '../../components/dashboard/DashboardContent';
// ... other imports

interface DashboardPageProps {
  // ... props interface
}

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
  return (
    <DashboardLayout>
      <DashboardContent {...props} />
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ... data fetching logic
  return {
    props: {
      // ... fetched data
    },
  };
};

export default DashboardPage;
```

## Key Pages

*   **`pages/index.tsx`:** The main landing page of the application.
*   **`pages/dashboard/index.tsx`:** The user's main dashboard, displaying key metrics and activity.
*   **`pages/chat.tsx`:** The primary interface for AI chat interactions.
*   **`pages/account.tsx`:** User account settings and profile management.
*   **`pages/billing.tsx`:** Billing information and subscription management.
*   **`pages/api/...`:** API routes that handle backend logic and data interactions. These are not rendered as UI pages but serve as backend endpoints.