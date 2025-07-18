## Project Name & Overview
Project Name: Nexus Flow AI. Goals: Automate and enhance communication and workflows for businesses and individuals using AI, enabling them to deploy intelligent AI assistants that can interact with users across various messaging platforms, manage conversations, track usage, and handle billing.

## Purpose & Scope
- In Scope:
  - Full-stack Next.js application
  - AI-powered chat interactions
  - Integration with WhatsApp, Facebook, Instagram for messaging
  - User authentication (NextAuth.js)
  - Supabase (PostgreSQL) for database
  - OpenAI API integration
  - Razorpay for payments
  - User dashboard with usage metrics
  - ROI Estimator and AI Content Generator tools
  - CRM simulation features (Lead Management, WhatsApp Drip Campaign)
  - Sentry for error tracking
  - Deployment to Vercel
- Out of Scope:
  - Real-time updates for usage metrics (planned enhancement)
  - Detailed analytics and reporting (planned enhancement)
  - Custom knowledge bases upload UI (planned enhancement)
  - UI for fine-tuning bot personas (planned enhancement)
  - Support for multiple bots per user/account (planned enhancement)
  - Integration with more messaging platforms (Telegram, Slack, custom CRM systems) (planned enhancement)
  - Full-fledged subscription management system (upgrades/downgrades, invoice generation) (planned enhancement)
  - Comprehensive admin interface (planned enhancement)
  - Migration of local JSON data storage to a robust database (identified technical debt)
  - Enhanced global error handling and logging (identified technical debt)
  - Comprehensive testing suite (identified technical debt)
  - Sophisticated/distributed API Rate Limiting (identified technical debt)
  - Refactoring of overly broad utility files (identified technical debt)
  - Hardcoded Sentry DSNs (identified technical debt)
  - Explicit database indexing strategy (identified technical debt)
  - Server-side caching (identified technical debt)
  - Live Conversation Component (temporarily removed)
  - Dashboard Preview Component (temporarily removed)
  - Comprehensive Environment Variable Documentation (ongoing)
  - Full webhook configuration for messaging platforms (ongoing)
  - Complete payment gateway integration (ongoing)
  - Refund policies (needs definition)

## Feature List
- AI-powered conversational agents/bots
- Automated messaging/chat integration with WhatsApp, Facebook, Instagram
- Intelligent, context-aware responses using OpenAI's GPT models
- Conversation memory and history
- Usage tracking and quota management
- Customizable bot personas
- User authentication and profile management
- Billing and subscription management (including Razorpay integration)
- Admin functionalities (log export, user management)
- Dashboard for managing AI bots, monitoring performance, and viewing usage statistics
- ROI & Budget Estimator tool
- AI Content Generator tool
- Smart Alerts/Notification system (foundation laid)
- Lead Management view (CRM simulation)
- WhatsApp Drip Campaign (CRM simulation)

## Tech Stack & Architecture
Framework: Next.js 14.2.3 (Full-stack, React for frontend, API Routes for backend). Styling: Tailwind CSS 3.4.1, PostCSS. Animation: Framer Motion. Database: Supabase (PostgreSQL). AI: OpenAI API (GPT models). Authentication: NextAuth.js (with PostgreSQL adapter). Payment Gateway: Razorpay. Error Tracking: Sentry. Data Fetching/Caching (Client-side): SWR. Deployment: Vercel (integrated with GitHub for CI/CD). Runtime: Node.js. Type Checking: TypeScript. Testing: Jest, TS-Jest. UI Libraries: Headless UI, Heroicons, React Icons. Charting: Recharts. Markdown Processing: gray-matter, remark, remark-html. Environment Variables: dotenv. Architecture: Modular component structure, domain-specific grouping, composition over inheritance. Backend uses Next.js API routes as serverless functions, with a lib/ directory for core business logic/services. Middleware for quota checks, rate limiting, and admin authentication.

### Tailwind Plugins
- DaisyUI integrated for future use.
- Legacy Tailwind styles remain untouched.

## AI Directives
- Delegation Rules: AI-related tasks are delegated to specific modules and API endpoints (e.g., lib/gptClient.ts, lib/memoryManager.ts, lib/botPersona.ts, pages/api/ai/). Coding Style: TypeScript for type safety, Tailwind CSS for utility-first styling, modular components, domain-specific grouping, custom React hooks for reusable logic, clear folder layout, linting enforced, and a desire for well-documented code.
- Mode inheritance
- Behavior limits

## Clarification Loops
Missing information is handled by: 1. Documenting as technical debt or future work (e.g., in docs/AUDIT.md, docs/future-work.md). 2. Using placeholders in code until fully implemented (e.g., 'dummy data' comments). 3. Addressing through detailed planning documents (e.g., docs/plan_next_billing_date_integration.md, docs/subscription_cancellation_plan.md).

## Technical Specs
Schemas: Database schema (inferred Supabase PostgreSQL tables: users, subscriptions, conversations, messages, usage, notification_preferences, leads, campaigns, scheduled_messages; column types inferred from API interactions and documentation). API Request/Response Schemas (implicitly defined by API route handlers). TypeScript Types (explicitly defined in types/ directory). SEO: components/SeoHead.tsx for managing page titles, meta descriptions, favicons. pages/index.tsx includes specific title and description. Design Tokens: Colors (eggshell, opal-white, gold shades, blush, purple-dark, purple-light) defined in tailwind.config.js. Spacing, Shadows, Animations extended in tailwind.config.js. Fonts: Poppins (Google Fonts).

## Session Ritual
- On every session start:
  - Load `projectBrief.md` and `progress.md`
  - Halt execution if PRD is missing or stale
  - Log clarifications to `projectBrief.md` if gaps found
  - Use “Think step by step” for deep reasoning

## Do’s & Don’ts
✅ Always adhere to PRD
❌ Never overwrite code without orchestration approval

## Revision Log
- v0.1 – 2025-11-07 – Auto-generated from full project context