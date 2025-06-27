# State Management

This document outlines the state management patterns used in the Nexus Flow AI application, primarily focusing on React's Context API and custom hooks.

## Global State with React Context

For application-wide state that needs to be accessible by many components without prop-drilling, React's Context API is utilized.

*   **`lib/context/DashboardContext.tsx`**: This context is designed to provide dashboard-related data and functions to various components within the dashboard section of the application. It typically wraps the dashboard layout and makes data like usage statistics, metrics, and system status available to its children.

## Local Component State

For state that is specific to a single component or a small group of closely related components, React's `useState` and `useReducer` hooks are used.

## Data Fetching and Caching with SWR (Implicit)

While not explicitly defined as a global state management library, the presence of `swr` in `lib/hooks/useProTrialActivation.ts` suggests that SWR (Stale-While-Revalidate) is used for data fetching and caching. SWR is a React Hooks library for data fetching that handles caching, revalidation, focus tracking, and more, making it an effective solution for managing asynchronous data state.

*   **`mutate` function**: Used to trigger re-fetching of data associated with a specific SWR key, ensuring UI updates after data modifications (e.g., after a successful API call).

## Custom Hooks for Encapsulated Logic

Many custom hooks (found in `lib/hooks/`) encapsulate stateful logic and side effects, making them reusable across different components and promoting a cleaner separation of concerns. These hooks often manage their own internal state and expose relevant data and functions.

Examples:

*   **`lib/hooks/useAuthStatus.ts`**: Manages authentication state, often interacting with `next-auth`.
*   **`lib/hooks/useChatLogic.ts`**: Encapsulates the logic for sending messages, managing conversation history, and interacting with the chat API.
*   **`lib/hooks/useDashboardData.ts`**: Aggregates data fetching for various dashboard sections, managing loading and error states.
*   **`lib/hooks/useUsageData.ts`**: Fetches and manages user usage logs and subscription details.
*   **`lib/hooks/useSystemStatus.ts`**: Fetches and manages the status of external services like OpenAI.

## State Persistence

For persistent state, especially user-specific data, the application interacts with backend API routes which then store data in Supabase (as indicated by `lib/supabaseClient.ts`) or local JSON files (`data/`). Client-side state is generally not persisted across sessions unless explicitly handled (e.g., via local storage, though not a primary pattern here).