# Nexus Flow AI: Automate & Enhance Communication

This repository contains the full-stack Next.js application for Nexus Flow AI, an AI-powered service designed to automate and enhance communication and workflows for businesses and individuals.

## Table of Contents

*   [Setup](./docs/setup.md)
*   [Architecture](./docs/architecture.md)
*   [Pages](./docs/pages.md)
*   [Components](./docs/components.md)
*   [State Management](./docs/state.md)
*   [Styling](./docs/styling.md)
*   [Deployment](./docs/deployment.md)
*   [Future Work](./docs/future-work.md)
*   [Documentation Audit](./docs/AUDIT.md)

## Quick Setup

1.  **Clone:** `git clone [repository-url] && cd nexusflow`
2.  **Install:** `npm install` (or `yarn install`)
3.  **Env Vars:** Create `.env.local` (see [Setup](./docs/setup.md) for details)
4.  **Run Dev Server:** `npm run dev` (or `yarn dev`)

## Core Folder Layout

*   `components/`: Reusable React components.
*   `pages/`: Application pages and API routes.
*   `lib/`: Helper functions and utility modules.
*   `docs/`: Project documentation.

## Tech Stack

*   **Framework:** Next.js 14.2.3
*   **Styling:** Tailwind CSS 3.4.1
*   **Animation:** Framer Motion
*   **Database:** Supabase (via `lib/supabaseClient.ts`)
*   **AI:** OpenAI API (via `lib/gptClient.ts`)

## Deployment Pipeline

The project is designed for seamless deployment to Vercel, integrating with GitHub for automatic builds and preview deployments on every push and pull request.

## Known Issues / Roadmap

*   Migrate local JSON data storage to a robust database.
*   Enhance error handling and logging.
*   Implement comprehensive testing.
*   See [Future Work](./docs/future-work.md) for more details.
