# Components

This document details the organization and usage of React components within the project, located in the `components/` directory.

## Overview

Components are reusable UI building blocks. They are organized into logical subdirectories based on their functionality or the page they primarily serve.

## Component Structure

*   **Functional Components:** Most components are functional components using React Hooks.
*   **Props:** Components receive data and functions via props.
*   **Styling:** Styling is typically handled using Tailwind CSS classes directly within the JSX, or through CSS Modules for more complex, scoped styles.

```tsx
// Example: components/Button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary' }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-semibold';
  const variantStyle = variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800';

  return (
    <button className={`${baseStyle} ${variantStyle}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

## Directory Structure Examples

*   **`components/ui/`:** Generic, highly reusable UI components (e.g., `Button`, `Modal`, `Input`).
*   **`components/dashboard/`:** Components specific to the dashboard section (e.g., `UsageChart`, `RecentActivityFeed`).
*   **`components/auth/`:** Components related to authentication (e.g., `AuthButtons`).
*   **`components/home/`:** Components used on the marketing/home page.

## Best Practices

*   **Modularity:** Keep components small and focused on a single responsibility.
*   **Reusability:** Design components to be reusable across different parts of the application.
*   **Prop Drilling vs. Context:** Use props for simple data passing. Consider React Context or state management libraries for global state or deeply nested data.
*   **Accessibility:** Ensure components are built with accessibility in mind (e.g., proper ARIA attributes, keyboard navigation).