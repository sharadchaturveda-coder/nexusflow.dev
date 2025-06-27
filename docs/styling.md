# Styling

This document details the styling conventions, Tailwind CSS usage, responsive breakpoints, and theming approach within the Nexus Flow AI application.

## Tailwind CSS Usage

The project exclusively uses **Tailwind CSS** for all styling. Tailwind is a utility-first CSS framework that allows for rapid UI development by composing classes directly in markup.

### Configuration

The primary configuration for Tailwind CSS is located in [`tailwind.config.js`](tailwind.config.js). This file extends Tailwind's default configuration with custom values relevant to the project's design system.

Key customizations include:

*   **`content`**: Specifies files where Tailwind should look for classes to generate the final CSS.
*   **`theme.extend.colors`**: Defines custom color palettes, such as:
    *   `eggshell`: `#F9F6F2`
    *   `opal-white`: `#F8F8F8`
    *   `gold`: A range of gold shades (`DEFAULT`, `light`, `dark`, `accent`).
    *   `blush`: `#fef2f2`
    *   `purple-dark`: `#6A0DAD`
    *   `purple-light`: `#8A2BE2`
*   **`theme.extend.height`**: Custom height utilities, e.g., `navbar: '64px'`.
*   **`theme.extend.boxShadow`**: Custom shadow styles, e.g., `soft-lg`, `glow-gold`.
*   **`theme.extend.backgroundImage`**: Custom linear gradients, e.g., `orange-fade`, `orange-gradient`, `purple-gradient`.
*   **`theme.extend.keyframes`**: Custom CSS keyframe animations.
*   **`theme.extend.animation`**: Custom animation utilities that use the defined keyframes.

## Responsive Breakpoints

Tailwind CSS provides a mobile-first approach to responsive design. Default breakpoints are used, which are:

*   `sm`: 640px
*   `md`: 768px
*   `lg`: 1024px
*   `xl`: 1280px
*   `2xl`: 1536px

These breakpoints are applied using utility class prefixes (e.g., `md:text-lg`, `lg:flex`). Components are designed to be fluid and adapt to different screen sizes by leveraging these responsive utilities.

## Theming

The application's visual theme is primarily driven by the custom color palette defined in `tailwind.config.js`.

*   **Color Palette**: The "candy-colored gradients" and "layered glassmorphism" mentioned in the project overview are achieved through the combination of custom colors and background image gradients.
*   **Consistent Look**: By centralizing color definitions and using Tailwind utilities, a consistent visual language is maintained across all components.
*   **Interactive Effects**: Interactive shimmer effects and floating visual artifacts are implemented using a combination of Tailwind's utility classes, custom animations (defined in `tailwind.config.js`), and potentially Framer Motion for more complex orchestrations.

## Global Styles

Global styles are defined in [`styles/globals.css`](styles/globals.css). This file typically includes base styles, font imports (e.g., Poppins from Google Fonts as seen in `pages/_document.tsx`), and any CSS resets or custom CSS that cannot be easily expressed with Tailwind utility classes.