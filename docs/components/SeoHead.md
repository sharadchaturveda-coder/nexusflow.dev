# `SeoHead` Component

This component centralizes SEO-related `<head>` tags for Next.js pages, including title, description, and favicon.

## Props

*   `title` (string): The title of the page.
*   `description` (string): The meta description for the page.
*   `favicon` (string, optional): The path to the favicon. Defaults to `/favicon.ico`.

## Usage

```typescript
import SeoHead from '@/components/SeoHead';

<SeoHead
  title="My Awesome Page"
  description="A description of my awesome page."
/>;
