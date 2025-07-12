# Documentation Audit Report - Nexus Flow AI

This report summarizes the audit of existing documentation and outlines the plan for overhauling and expanding it.

## 1. Audit Existing Documentation

### `README.md` (Main Project Root)

*   **Keep (and adapt for conciseness)**:
    *   Project Name (`# Nexus Flow AI: Automate & Enhance Communication`)
    *   Brief Project Overview (`This repository contains the full-stack Next.js application...`)
    *   Tech Stack Summary (`## Tech Stack`)
    *   Deployment Pipeline (`## Deployment Pipeline`)
    *   Known Issues / Roadmap (`## Known Issues / Roadmap`) - This section is valuable for quick overview.
*   **Rewrite (and integrate into new structure)**:
    *   `Table of Contents`: Will be replaced with an auto-updating TOC linking to the new `docs/*.md` files.
    *   `Quick Setup`: Content is good but will be moved to `docs/setup.md` and linked.
    *   `Core Folder Layout`: Content is good but will be moved to `docs/architecture.md` or `docs/folder-layout.md` and linked.
*   **Remove (from `README.md` to meet line limit, content will be relocated)**:
    *   The extensive descriptions under "Overview," "What is Nexus Flow AI?", and "Features" (if they existed in a previous version) will be removed from the main `README.md` and distributed into the new, more specific documentation files within the `docs/` directory.

### Existing `docs/` Folder Files

*   **Keep**:
    *   [`docs/architecture_dossier.md`](docs/architecture_dossier.md): Comprehensive and detailed. This should be the primary source for architectural deep dives.
    *   [`docs/mvp-vision-report.md`](docs/mvp-vision-report.md): Historical project completion report, valuable for context.
    *   [`docs/plan_next_billing_date_integration.md`](docs/plan_next_billing_date_integration.md): Detailed plan for a specific feature, valuable historical record.
    *   [`docs/subscription_cancellation_plan.md`](docs/subscription_cancellation_plan.md): Detailed plan for a specific feature, valuable historical record.
    *   [`docs/components/AccordionItem.md`](docs/components/AccordionItem.md): Clear component documentation.
    *   [`docs/components/MobileAuthenticatedNavLinks.md`](docs/components/MobileAuthenticatedNavLinks.md): Clear component documentation.
    *   [`docs/components/MobileUnauthenticatedNavLinks.md`](docs/components/MobileUnauthenticatedNavLinks.md): Clear component documentation.
    *   [`docs/components/NavbarMobileMenuItemLink.md`](docs/components/NavbarMobileMenuItemLink.md): Clear component documentation.
    *   [`docs/components/SeoHead.md`](docs/components/SeoHead.md): Clear component documentation.
    *   [`docs/components/auth/AuthButtons.md`](docs/components/auth/AuthButtons.md): Clear component documentation.
    *   [`docs/components/auth/AuthenticatedButtons.md`](docs/components/auth/AuthenticatedButtons.md): Clear component documentation.
    *   [`docs/components/auth/UnauthenticatedButton.md`](docs/components/auth/UnauthenticatedButton.md): Clear component documentation.
    *   [`docs/components/billing/BillingLayout.md`](docs/components/billing/BillingLayout.md): Clear component documentation.
    *   [`docs/components/chat/ChatDisplay.md`](docs/components/chat/ChatDisplay.md): Clear component documentation.
    *   [`docs/components/chat/ChatInputForm.md`](docs/components/chat/ChatInputForm.md): Clear component documentation.
    *   [`docs/components/chat/ChatPageLayout.md`](docs/components/chat/ChatPageLayout.md): Clear component documentation.
    *   [`docs/components/dashboard/UsageHistoryList.md`](docs/components/dashboard/UsageHistoryList.md): Clear component documentation.
    *   [`docs/components/help/HelpPageLayout.md`](docs/components/help/HelpPageLayout.md): Clear component documentation.
    *   [`docs/constants/faqs.md`](docs/constants/faqs.md): Clear constant documentation.
    *   [`docs/context/DashboardContext.md`](docs/context/DashboardContext.md): Clear context documentation.
    *   [`docs/hooks/useAuthStatus.md`](docs/hooks/useAuthStatus.md): Clear hook documentation.
    *   [`docs/hooks/useChatLogic.md`](docs/hooks/useChatLogic.md): Clear hook documentation.
    *   [`docs/hooks/useUsageTotals.md`](docs/hooks/useUsageTotals.md): Clear hook documentation.

*   **Rewrite (and rename/integrate)**:
    *   [`docs/architecture.md`](docs/architecture.md): Good high-level overview, but can be expanded and refined by integrating key insights from `architecture_dossier.md`.
    *   [`docs/components.md`](docs/components.md): Good initial overview. Rewrite, expand to include styling conventions, and keep as `docs/components.md`.
    *   [`docs/deployment.md`](docs/deployment.md): Good starting point. Rewrite, expand to detail the GitHub → Vercel pipeline and branch rules.
    *   [`docs/future-work.md`](docs/future-work.md): Keep and update as a living document for roadmap and technical debt. Ensure it's regularly reviewed.
    *   [`docs/pages.md`](docs/pages.md): Good initial overview. Rewrite, expand, and keep as `docs/pages.md`.
    *   [`docs/setup.md`](docs/setup.md): Good content. Rewrite, expand to include comprehensive details on environment variables and secrets patterns.
    *   [`docs/state.md`](docs/state.md): Good overview. Rewrite, expand, and keep as `docs/state.md`.
    *   [`docs/styling.md`](docs/styling.md): Good overview. Rewrite, expand, and keep as `docs/styling.md`.
    *   [`docs/CHANGE_LOG.md`](docs/CHANGE_LOG.md): This is a placeholder. It should be rewritten to be a proper, actively maintained change log.

*   **Remove**:
    *   `docs/AUDIT.md`: This file is the deliverable of this task, so it will be generated.
    *   `docs/README.md`: // REVIEW: `docs/README.md` - Redundant, as the main project `README.md` serves as the primary entry point.

### Inline Comments and Code Annotations

*   **Keep**:
    *   Most inline comments that provide immediate context for specific lines of code.
    *   Comments explaining temporary removals (e.g., `// Temporarily removed`).
    *   Comments highlighting configuration details (e.g., `// Use NEXT_PUBLIC_ for client-side vars`).
    *   JSDoc-like comments for placeholder functions or complex logic.
    *   Comments in configuration files (e.g., `tailwind.config.js`, `next.config.mjs`).
    *   Comments indicating type references (e.g., `next-env.d.ts`).
    *   Comments explaining specific API route behavior (e.g., `pages/api/messaging/instagram.ts:6`).
    *   Comments explaining dummy data in API routes that are still in use (e.g., `pages/api/ai/feedback.ts:6`).
    *   Comments explaining specific logic in hooks (e.g., `lib/hooks/useChatLogic.ts:18`).
    *   Comments explaining specific UI behavior (e.g., `components/home/InteractiveSalesAgent.tsx:87`).

*   **Rewrite**:
    *   Comments that are vague or could be better explained in the new structured documentation (e.g., high-level architectural comments that are better suited for `docs/architecture.md`).
    *   Comments that are too verbose for inline context and would be better as part of a dedicated documentation file.

*   **Remove (and flag with `// REVIEW:`)**:
    *   `pages/api/status/webhooks.ts:8` (`// Since there's no external webhook configured yet, return a placeholder status`) - `// REVIEW: Remove if external webhooks are configured and status is dynamic.`
    *   `pages/api/user/quota.ts:6` (`// Dummy data for user quota`) - `// REVIEW: Remove if real quota fetching is implemented.`
    *   `pages/api/dashboard/bots.ts:6` (`// Dummy data for active bots`) - `// REVIEW: Remove if real bot data fetching is implemented.`
    *   `pages/api/dashboard/metrics.ts:6` (`// Dummy data for hero metrics`) - `// REVIEW: Remove if real metrics data fetching is implemented.`
    *   `pages/api/dashboard/activity.ts:6` (`// Dummy data for recent activity feed`) - `// REVIEW: Remove if real activity data fetching is implemented.`
    *   `pages/api/dashboard/usage.ts:6` (`// Dummy data for usage chart`) - `// REVIEW: Remove if real usage data fetching is implemented.`
    *   `lib/usageLogger.ts:1` (`// lib/usageLogger.ts (New version)`) - `// REVIEW: Remove if this is no longer a "new version" and is stable.`
    *   `lib/memoryManager.ts:1` (`// lib/memoryManager.ts (New version)`) - `// REVIEW: Remove if this is no longer a "new version" and is stable.`
    *   `middleware/withQuotaCheck.ts:1` (`// middleware/withQuotaCheck.ts (New version)`) - `// REVIEW: Remove if this is no longer a "new version" and is stable.`
    *   `pages/crm/campaigns.tsx:15` (`// Replace with a proper toast implementation if available`) - `// REVIEW: Remove if a proper toast implementation is added.`
    *   `pages/billing.tsx:172` (`// Placeholder, as price might not be directly available here`) - `// REVIEW: Remove if price is directly available.`
    *   `pages/billing.tsx:173` (`// Placeholder`) - `// REVIEW: Remove if keyLimit is directly available.`
    *   `pages/billing.tsx:174` (`// Placeholder`) - `// REVIEW: Remove if features are directly available.`
    *   `pages/billing.tsx:175` (`// Placeholder`) - `// REVIEW: Remove if button text is dynamic.`
    *   `components/NavbarDesktop.tsx:8` (`// No longer needs sections or activeSection props`) - `// REVIEW: Remove if props are permanently removed.`
    *   `components/NavbarMobile.tsx:10` (`// No longer needs sections prop`) - `// REVIEW: Remove if props are permanently removed.`
    *   `components/dashboard/UsageChart.tsx:11` (`// Removed selectedMetric state and handlers as we only display tokens_used`) - `// REVIEW: Remove if selectedMetric is permanently removed.`
    *   `components/dashboard/SystemStatusSection.tsx:40` (`// This would typically be dynamic, keeping as loading for now`) - `// REVIEW: Update if status becomes dynamic.`
    *   `components/billing/BillingHistoryTable.tsx:4` (`// Replace 'any' with a more specific type when available`) - `// REVIEW: Update type to a more specific one.`
    *   `pages/api/payments/webhook.ts:22` (`// Changed userId to user_id // You MUST pass user_id in notes from frontend`) - `// REVIEW: Remove if the change is fully implemented and stable.`
    *   `pages/api/payments/webhook.ts:27` (`// Changed tokenLimit to token_limit // Pro plan limit`) - `// REVIEW: Remove if the change is fully implemented and stable.`
    *   `pages/api/payments/webhook.ts:28` (`// Changed userId to user_id`) - `// REVIEW: Remove if the change is fully implemented and stable.`
    *   `pages/index.tsx:18` (`// import LiveConversation from '../components/home/LiveConversation'; // Temporarily removed as per user request`) - `// REVIEW: Remove if LiveConversation is permanently removed or re-implemented.`
    *   `pages/index.tsx:19` (`// import DashboardPreview from '../components/home/DashboardPreview'; // Removed as per user request`) - `// REVIEW: Remove if DashboardPreview is permanently removed or re-implemented.`

## 2. Deliverable: `docs/AUDIT.md`

This report itself serves as the `docs/AUDIT.md` deliverable.