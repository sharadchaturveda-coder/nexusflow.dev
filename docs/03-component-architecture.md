# Component Architecture

This document describes the component architecture of the project.

## Core Components

-   **`pages/index.tsx`**: The main landing page component. It orchestrates the layout and includes all other section components.
-   **`components/Navbar.tsx`**: The sticky navigation bar component.
-   **`components/home/*.tsx`**: Each section of the landing page is a separate component, located in the `components/home` directory.
-   **`components/InfiniteBusinessScroll.tsx`**: A reusable component that creates an infinite, auto-looping marquee of business cards.
-   **`components/RateSlider.tsx`**: A reusable component that allows users to estimate their monthly costs. This component is further broken down into smaller components for the sliders, model selector, and cost display.
-   **`components/home/Hero.tsx`**: This component is broken down into smaller components for each zone of the hero section.
-   **`components/home/Pricing.tsx`**: This component is broken down into a `PricingCard` component.

## Styling

-   **Tailwind CSS**: The project uses Tailwind CSS for all styling. The configuration is located in `tailwind.config.js`.
-   **Framer Motion**: Framer Motion is used for all animations.

## Data Flow

-   **`lib/costCalculator.ts`**: This module contains the logic for calculating the estimated cost of using the service. It is used by the `RateSlider` component.

### Dashboard Backend Integration

The dashboard components (`components/dashboard/*.tsx`) are designed to be data-agnostic and easily integrate with various backend APIs. Currently, they utilize dummy data for demonstration purposes.

Each component is structured to accept data via props, allowing for a clear separation of concerns between the UI and data fetching logic. When connecting to a live backend, the dummy data should be replaced with actual API calls.

For example:
-   **Hero Metric Cards**: Will fetch aggregated metrics (total messages, tokens consumed, API cost, active conversations) from a `/api/dashboard/metrics` endpoint.
-   **Usage Chart**: Will fetch daily usage data (tokens, messages, API cost) from a `/api/dashboard/usage` endpoint, with parameters for date ranges or metric types.
-   **Active Users / Bots Panel**: Will retrieve a list of active bots and their details from a `/api/dashboard/bots` endpoint.
-   **Quota Overview**: Will fetch current plan details, tokens used, and maximum quota from a `/api/user/quota` or similar endpoint.
-   **Recent Activity Feed**: Will consume a real-time stream or periodically poll a `/api/dashboard/activity` endpoint for recent events.
-   **System Status Widgets**: Will make calls to various internal or external endpoints (e.g., `/api/status/openai`, `/api/status/webhooks`) to check service health and latency.
-   **Experimental / AI Feedback Section**: Will fetch data related to personality usage and GPT model distribution from dedicated AI analytics endpoints (e.g., `/api/ai/feedback`).

The `pages/dashboard/index.tsx` orchestrates the data fetching and passes the relevant data down to its child components.
