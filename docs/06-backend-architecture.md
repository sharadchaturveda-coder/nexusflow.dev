# Backend Architecture

The backend of the Nexus Flow AI project is primarily built using **Next.js API Routes**, which function as serverless endpoints. This architecture allows the application to handle server-side logic, interact with external APIs (like OpenAI), manage data, and enforce business rules efficiently.

## Key Backend Components and Their Interactions:

### 1. API Routes (`pages/api/` and `api/`)

These are the entry points for client-side requests, acting as serverless functions.

*   **`api/messages/relay.ts`**: This is a central API route for AI interactions.
    *   It receives user messages and a `user_id`.
    *   It applies **middleware** (`withQuotaCheck`) to ensure the user has sufficient token quota before processing the request.
    *   It retrieves the user's conversation history (`getUserMemory`) and the bot's persona (`getBotPersona`).
    *   It sends the combined messages (including system prompt from persona) to the **OpenAI API** via `lib/gptClient.ts`.
    *   It calculates the cost of the AI interaction (`lib/tokenCostCalculator.ts`).
    *   It logs the usage data (`lib/usageLogger.ts`).
    *   It updates the user's conversation memory (`lib/memoryManager.ts`).
    *   Finally, it returns the AI's response along with usage details and remaining quota.
*   **Other API Routes:**
    *   **`pages/api/admin/*`**: Handles administrative tasks such as exporting logs (`export.ts`) and managing user accounts (e.g., locking users via `[id]/lock.ts`).
    *   **`pages/api/ai/feedback.ts`**: Manages user feedback related to AI interactions.
    *   **`pages/api/dashboard/*`**: Provides data for the user dashboard, including activity feeds (`activity.ts`), bot information (`bots.ts`), key metrics (`metrics.ts`), and detailed usage statistics (`usage.ts`).
    *   **`pages/api/messaging/*`**: Integrates with various messaging platforms (Facebook, Instagram, WhatsApp) to handle incoming and outgoing messages.
    *   **`pages/api/status/*`**: Checks the operational status of external services like OpenAI (`openai.ts`) and internal webhooks (`webhooks.ts`).
    *   **`pages/api/user/quota.ts`**: Retrieves specific user quota information.

### 2. Core Logic / Libraries (`lib/`)

This directory contains reusable modules that encapsulate specific business logic and external integrations, promoting modularity and maintainability.

*   **`lib/gptClient.ts`**:
    *   Manages direct communication with the OpenAI API.
    *   Uses the `openai` NPM package to create chat completions.
    *   Handles API key authentication via environment variables (`process.env.OPENAI_API_KEY`).
*   **`lib/memoryManager.ts`**:
    *   Manages the persistent storage and retrieval of user conversation history.
    *   Stores messages in individual JSON files (`data/memory/{user_id}.json`).
    *   Includes logic for truncating conversation history based on token limits (`MAX_MEMORY_TOKENS`) and message count to prevent excessively long contexts for the AI.
    *   Utilizes Node.js `fs/promises` for asynchronous file system operations.
*   **`lib/usageLogger.ts`**:
    *   Records and retrieves user usage data, including tokens consumed, cost incurred, and timestamps.
    *   Stores logs in a centralized `data/usage.json` file.
    *   Provides functions to log new usage entries and calculate total usage for a specific user.
*   **`lib/tokenCostCalculator.ts`**: Contains logic to calculate the financial cost of AI interactions based on tokens used and the specific AI model.
*   **`lib/botPersona.ts`**: Retrieves and manages predefined "system prompts" or characteristics for different AI bots, allowing for varied AI behaviors.
*   **`lib/planChecker.ts`**: Determines user plan details and associated limits (e.g., `token_limit`, allowed `model`), crucial for enforcing service tiers.
*   **`lib/transactionManager.ts`**: Likely handles financial transactions, billing, or credit management for users.
*   **`lib/companyDataManager.ts`**: Could manage company-specific data, configurations, or knowledge bases.

### 3. Middleware (`middleware/` and `pages/api/middleware/`)

These functions wrap API routes to add common functionalities that execute before the main handler, such as authentication, authorization, and rate limiting.

*   **`middleware/withQuotaCheck.ts`**: Checks if a user has enough quota (e.g., tokens remaining) before allowing an API request to proceed, preventing overuse.
*   **`pages/api/middleware/rateLimiter.ts`**: Implements rate limiting to prevent API abuse and ensure fair usage across users.
*   **`pages/api/middleware/withAdminAuth.ts`**: Enforces administrator authentication for sensitive admin API routes, ensuring only authorized personnel can access them.

### 4. Data Storage (`data/`)

The project utilizes local JSON files for data persistence, indicating a simpler, file-based "backend" rather than a traditional database. This approach is common for smaller Next.js projects or prototypes.

*   **`data/memory/`**: Stores individual user conversation histories.
*   **`data/usage.json`**: Stores a centralized log of all user AI usage.
*   **`data/packages.json`**: Likely defines different subscription packages or plans.
*   **`data/transactions.json`**: Stores records of financial transactions.
*   **`data/users.json`**: Likely contains user profiles and associated data.

## Overall Backend Flow (Example: AI Message Relay)

1.  A client (frontend) sends a POST request with `user_id` and `message` to the `/api/messages/relay` endpoint.
2.  The request is first processed by the `withQuotaCheck` middleware, which verifies the user's plan and remaining token quota.
3.  If the quota is sufficient, the main `handler` function in `api/messages/relay.ts` proceeds.
4.  It fetches the user's past conversation from their dedicated JSON file in `data/memory/` and retrieves the appropriate bot's system prompt.
5.  It constructs a request to the OpenAI API using `lib/gptClient.ts`, sending the current message along with the conversation history and system prompt.
6.  Upon receiving the AI's response, the system calculates the cost of the interaction using `lib/tokenCostCalculator.ts` and logs the usage to `data/usage.json` via `lib/usageLogger.ts`.
7.  The new user message and the AI's response are then appended to the user's conversation history in `data/memory/{user_id}.json` using `lib/memoryManager.ts`.
8.  Finally, the AI's response, along with updated usage details and remaining quota, is sent back to the client.

This robust, serverless-oriented backend architecture leverages Next.js API routes, local file-based data storage, and modularized logic for interacting with external services and managing application-specific data.
