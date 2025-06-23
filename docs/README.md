# Nexus Flow AI - Modular Refactor

This document outlines the modular refactoring efforts for the Nexus Flow AI Next.js codebase, focusing on improving readability, maintainability, and modularity without altering existing layout or functionality.

## Refactoring Summary

The refactoring process involved breaking down large components, extracting inline logic into custom hooks and utilities, renaming ambiguous variables and files, and organizing the codebase by feature.

### Key Changes and New Modules:

*   **`lib/hooks/useAuthStatus.ts`**: A custom hook to centralize authentication status and actions.
*   **`components/auth/UnauthenticatedButton.tsx`**: Component for the sign-in button for unauthenticated users.
*   **`components/auth/AuthenticatedButtons.tsx`**: Component for the dropdown menu for authenticated users.
*   **`components/NavbarMobileMenuItemLink.tsx`**: Reusable component for mobile navigation menu items.
*   **`components/MobileAuthenticatedNavLinks.tsx`**: Component for authenticated navigation links in mobile.
*   **`components/MobileUnauthenticatedNavLinks.tsx`**: Component for unauthenticated navigation links in mobile.
*   **`components/SeoHead.tsx`**: Centralized component for managing SEO-related `<head>` tags.
*   **`components/billing/BillingLayout.tsx`**: Layout component for the billing page.
*   **`lib/hooks/useChatLogic.ts`**: Custom hook encapsulating chat page logic.
*   **`components/chat/ChatDisplay.tsx`**: Component for displaying chat messages.
*   **`components/chat/ChatInputForm.tsx`**: Component for chat message input and sending.
*   **`components/chat/ChatPageLayout.tsx`**: Layout component for the chat page.
*   **`components/AccordionItem.tsx`**: Reusable component for collapsible accordion items.
*   **`constants/faqs.ts`**: File to store FAQ data.
*   **`components/help/HelpPageLayout.tsx`**: Layout component for the help page.
*   **`lib/context/DashboardContext.tsx`**: React Context for managing dashboard data, reducing prop drilling.
*   **`lib/hooks/useUsageTotals.ts`**: Hook for calculating total token usage and cost.
*   **`components/dashboard/UsageHistoryList.tsx`**: Component for displaying usage history.

## File & Folder Discipline Adherence:

*   **Line Limits:** All refactored files now adhere to the 50-line limit, with exceptions only where a clean split was not feasible (e.g., `AuthenticatedButtons.tsx` is 60 lines, which is acceptable given its complexity and the 100-line ceiling).
*   **Feature Grouping:** New components, hooks, and utilities are organized into logical, feature-based directories (e.g., `components/auth/`, `lib/hooks/`, `components/chat/`).
*   **Documentation:** Corresponding documentation files have been created or updated in the `docs/` directory, mirroring the new file hierarchy and adhering to the <50-line limit.

## Verification:

Throughout the refactoring process, care was taken to ensure zero visual or behavioral changes on both mobile and desktop. Each change was atomic and verified to maintain existing functionality, navigation, and interactivity.
