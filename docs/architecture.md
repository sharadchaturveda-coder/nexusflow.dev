# Architecture

This document provides an overview of the project's architecture, detailing its main components and their interactions.

## Overview

The project is a Next.js application, leveraging React for the frontend, Next.js for server-side rendering and API routes, and Supabase for backend services (authentication, database, storage).

## Key Components

*   **Frontend (Next.js/React):**
    *   **Pages:** Located in `pages/`, these are React components that correspond to different routes in the application.
    *   **Components:** Reusable UI elements found in `components/`.
    *   **Hooks:** Custom React hooks in `lib/hooks/` for encapsulating stateful logic.
    *   **Utilities:** Helper functions and client-side logic in `lib/`.

*   **Backend (Next.js API Routes):**
    *   Located in `pages/api/`, these are serverless functions that handle API requests, interact with the database, and integrate with external services.
    *   **Middleware:** Custom middleware (e.g., `middleware/withQuotaCheck.ts`) for request processing.

*   **Database (Supabase):**
    *   Provides PostgreSQL database, authentication, and storage services.
    *   Interactions are primarily handled through `lib/supabaseClient.ts` and various API routes.

## Data Flow

1.  **User Interaction:** User interacts with the React frontend.
2.  **Client-side Logic:** React components and hooks manage local state and make API calls.
3.  **API Requests:** Frontend sends requests to Next.js API routes.
4.  **Server-side Processing:** API routes process requests, interact with Supabase (database, auth), and external services.
5.  **Data Response:** API routes send data back to the frontend.
6.  **UI Update:** Frontend updates the UI based on the received data.

## Authentication

Authentication is handled via NextAuth.js, integrated with Supabase. User sessions are managed securely.

## Deployment

The application is designed for deployment on Vercel, leveraging Next.js's serverless capabilities.