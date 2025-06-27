# Pages

This document describes the routing scheme, dynamic routes, and responsibilities of key pages within the Nexus Flow AI application.

## Routing Scheme

The application uses Next.js's file-system based routing. Each file in the `pages/` directory corresponds to a route.

*   `pages/index.tsx`: The main landing page.
*   `pages/chat.tsx`: The primary chat interface for AI interactions.
*   `pages/dashboard/index.tsx`: The main user dashboard.
*   `pages/dashboard/usage.tsx`: Detailed usage statistics page within the dashboard.
*   `pages/account.tsx`: User account settings.
*   `pages/billing.tsx`: Billing and subscription management.
*   `pages/pricing.tsx`: Displays pricing plans.
*   `pages/help.tsx`: Help and FAQ section.

## Dynamic Routes

Next.js supports dynamic routes by using bracket syntax in filenames.

*   `pages/api/admin/users/[id]/lock.ts`: An example of a dynamic API route to lock a specific user by their ID.

## Page Responsibilities

Each page component is responsible for:

*   **Layout Orchestration**: Arranging and rendering child components to form the complete page view.
*   **Data Fetching**: Initiating data fetching from API routes or external services, often using `getServerSideProps` or client-side hooks.
*   **State Management**: Managing page-specific state and interacting with global state (e.g., via React Context or custom hooks).
*   **User Interaction**: Handling user input and navigation.

### Key Page Details

*   **`pages/index.tsx`**: Orchestrates the landing page, integrating various marketing and feature components (`Hero`, `HowItWorks`, `Pricing`, `FAQ`, `CTA`).
*   **`pages/chat.tsx`**: Manages the chat UI, including displaying messages, handling user input, and integrating with the AI message relay API. It uses `ChatPageLayout` for consistent styling.
*   **`pages/dashboard/index.tsx`**: The central hub for authenticated users, displaying key metrics, recent activity, and system status. It fetches data from various `/api/dashboard` endpoints.
*   **`pages/api/*`**: These are Next.js API routes, functioning as serverless backend endpoints. They handle business logic, database interactions (via Supabase client), and external API calls (e.g., OpenAI).