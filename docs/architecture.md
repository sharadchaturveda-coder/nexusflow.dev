# Architecture

This document outlines the overall architecture of the Nexus Flow AI application, covering both frontend and backend components, data flow, and key design patterns.

## Project Overview

Nexus Flow AI is an AI-powered service designed to automate and enhance communication and workflows for businesses and individuals. This full-stack application provides a user-facing website and underlying AI and data management systems.

### Core Services

*   **Automated Messaging/Chat:** Integration with platforms like WhatsApp, Facebook, and Instagram for automated customer interactions.
*   **Intelligent Responses:** Leveraging advanced AI models (OpenAI's GPT models) for context-aware responses.
*   **Conversation Memory:** Maintaining context across interactions for natural conversational experiences.
*   **Usage Tracking & Quota Management:** Monitoring and managing AI resource consumption based on subscription plans.
*   **Customizable Bot Personas:** Defining specific behaviors or knowledge bases for different AI bots.

## Frontend Architecture

The frontend is built with Next.js, Tailwind CSS, and Framer Motion, focusing on a visually engaging and responsive user experience.

### Core Folder Layout

*   `components/`: Reusable React components.
*   `pages/`: Application pages and API routes.
*   `public/`: Static assets.
*   `styles/`: Global stylesheets.
*   `lib/hooks/`: Custom React hooks for shared logic.
*   `lib/context/`: React Context API for global state.

### Data Flow (Frontend)

Frontend components interact with backend API routes to fetch and send data. Data fetching is often orchestrated in `pages/` components (e.g., `pages/dashboard/index.tsx`) and passed down via props or managed through global state.

### Custom Hooks

The `lib/hooks/` directory contains custom React hooks to encapsulate reusable logic, such as:

*   `useAuthStatus.ts`: Manages user authentication status.
*   `useChatLogic.ts`: Handles chat message sending and conversation state.
*   `useUsageTotals.ts`: Fetches and processes user usage data.

## Backend Architecture

The backend leverages Next.js API Routes as serverless endpoints for server-side logic, external API interactions (OpenAI), data management, and business rule enforcement.

### Key Backend Components

1.  **API Routes (`pages/api/` and `api/`)**: Entry points for client-side requests.
    *   `api/messages/relay.ts`: Central AI interaction route, handling middleware (quota check), memory management, OpenAI API calls, and usage logging.
    *   `pages/api/admin/*`: Administrative tasks (log export, user management).
    *   `pages/api/ai/feedback.ts`: Manages AI interaction feedback.
    *   `pages/api/dashboard/*`: Provides dashboard data (activity, metrics, usage).
    *   `pages/api/messaging/*`: Integrates with messaging platforms (Facebook, Instagram, WhatsApp).
    *   `pages/api/status/*`: Checks external service status (OpenAI, webhooks).
    *   `pages/api/user/*`: User-specific data (quota, profile, deletion).

2.  **Core Logic / Libraries (`lib/`)**: Reusable modules for business logic and integrations.
    *   `lib/gptClient.ts`: Manages OpenAI API communication.
    *   `lib/memoryManager.ts`: Handles persistent storage and retrieval of conversation history (local JSON files).
    *   `lib/usageLogger.ts`: Records user usage data.
    *   `lib/tokenCostCalculator.ts`: Calculates AI interaction costs.
    *   `lib/botPersona.ts`: Manages AI bot system prompts.
    *   `lib/planChecker.ts`: Determines user plan details and limits.
    *   `lib/supabaseClient.ts`: Initializes and exports the Supabase client for database interactions.

3.  **Middleware (`middleware/` and `pages/api/middleware/`)**: Functions wrapping API routes for common functionalities.
    *   `middleware/withQuotaCheck.ts`: Ensures sufficient user token quota.
    *   `pages/api/middleware/rateLimiter.ts`: Implements API rate limiting.
    *   `pages/api/middleware/withAdminAuth.ts`: Enforces administrator authentication.

4.  **Data Storage (`data/`)**: Local JSON files for data persistence (e.g., `data/memory/`, `data/usage.json`, `data/users.json`). This indicates a file-based backend for simpler projects.

## Overall Backend Flow (Example: AI Message Relay)

1.  Client sends POST request to `/api/messages/relay`.
2.  `withQuotaCheck` middleware verifies user quota.
3.  Handler fetches conversation history and bot persona.
4.  Request sent to OpenAI API via `lib/gptClient.ts`.
5.  AI response received; cost calculated (`lib/tokenCostCalculator.ts`) and usage logged (`lib/usageLogger.ts`).
6.  New messages appended to conversation history (`lib/memoryManager.ts`).
7.  AI response and updated usage details sent back to client.