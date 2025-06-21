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
