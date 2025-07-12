# Styling

This document describes the styling methodologies used within the project.

## Overview

The project primarily uses Tailwind CSS for utility-first styling, complemented by CSS Modules for component-specific styles when necessary.

## Tailwind CSS

Tailwind CSS is the main approach for styling. It provides a set of utility classes that can be composed directly in JSX to build designs.

### Configuration

Tailwind CSS is configured via `tailwind.config.js` and `postcss.config.js`. Customizations for themes, colors, spacing, etc., are defined in `tailwind.config.js`.

### Usage

Apply Tailwind classes directly to HTML elements or React components:

```tsx
<div className="flex items-center justify-center min-h-screen bg-gray-100">
  <h1 className="text-3xl font-bold text-blue-600">Hello, Tailwind!</h1>
</div>
```

## CSS Modules

For styles that are highly specific to a component and need to avoid global scope conflicts, CSS Modules are used. These are typically found in `styles/` or alongside components.

### Usage

1.  Create a CSS file with the `.module.css` extension (e.g., `styles/Button.module.css`).
    ```css
    /* styles/Button.module.css */
    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }

    .button:hover {
      background-color: #0056b3;
    }
    ```

2.  Import the module into your React component:
    ```tsx
    import React from 'react';
    import styles from '../styles/Button.module.css';

    const MyButton: React.FC = () => {
      return (
        <button className={styles.button}>
          Click Me
        </button>
      );
    };

    export default MyButton;
    ```

## Global Styles

Global styles, such as base typography or resets, are defined in `styles/globals.css` and imported into `pages/_app.tsx`.

## Iconography

(Placeholder for icon library usage, e.g., React Icons, Font Awesome)