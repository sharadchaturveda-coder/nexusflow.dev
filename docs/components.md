# Components

This document describes the component hierarchy, styling conventions, and key reusable components within the Nexus Flow AI application.

## Component Hierarchy

Components are organized primarily within the `components/` directory, often grouped by their functional area (e.g., `components/home/`, `components/dashboard/`).

*   **Layout Components**: Provide structural wrappers for pages (e.g., `components/Navbar.tsx`, `components/chat/ChatPageLayout.tsx`).
*   **UI Elements**: Reusable, atomic UI elements (e.g., `components/AccordionItem.tsx`, `components/UpgradeButton.tsx`).
*   **Feature-Specific Components**: Components that make up distinct sections or features of a page (e.g., `components/home/Hero.tsx`, `components/dashboard/UsageChart.tsx`).

## Styling Conventions

The project uses **Tailwind CSS** for all styling, providing a utility-first CSS framework.

*   **Configuration**: The main Tailwind configuration is in `tailwind.config.js`, where custom colors, spacing, shadows, and animations are defined.
*   **Responsive Design**: Tailwind's responsive utility classes are used to ensure a mobile-first and adaptive design across various screen sizes. Breakpoints are handled by Tailwind's default configuration unless overridden.
*   **Theming**: The primary theming is achieved through Tailwind's color palette, with custom colors like `eggshell`, `opal-white`, `gold`, `blush`, and various gradients defined in `tailwind.config.js`.
*   **Animations**: **Framer Motion** is used for all animations, providing declarative and performant motion for UI elements. Animations are often applied directly to components using `motion.div`, `motion.span`, etc.

## Key Reusable Components

*   **`components/Navbar.tsx`**: The main navigation bar, adapting for desktop and mobile views (`NavbarDesktop.tsx`, `NavbarMobile.tsx`). It dynamically renders authentication-related buttons based on user session status.
*   **`components/home/*.tsx`**: A collection of components forming the landing page sections (e.g., `Hero`, `HowItWorks`, `Pricing`, `FAQ`, `Testimonials`).
*   **`components/InfiniteBusinessScroll.tsx`**: Creates an infinitely looping marquee effect for displaying business cards or logos.
*   **`components/RateSlider.tsx`**: An interactive component allowing users to estimate monthly costs based on AI usage.
*   **`components/dashboard/*.tsx`**: Components specific to the user dashboard, such as `HeroMetricCard`, `UsageChart`, `SystemStatusWidget`, and `QuotaProgressBar`. These are designed to be data-agnostic and receive data via props.
*   **`components/SeoHead.tsx`**: A utility component for managing SEO-related `<head>` tags, ensuring consistent metadata across pages.