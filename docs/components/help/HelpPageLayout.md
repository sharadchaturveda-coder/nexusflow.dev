# `HelpPageLayout` Component

This component provides a consistent layout for the help and FAQ page, including SEO metadata, the navigation bar, and a main content area.

## Props

*   `children`: The content to be rendered within the layout.
*   `title` (string): The title for the page's SEO.
*   `description` (string): The meta description for the page's SEO.

## Usage

```typescript
import HelpPageLayout from '@/components/help/HelpPageLayout';

<HelpPageLayout title="Help & Support" description="Find answers to common questions.">
  {/* FAQ content here */}
</HelpPageLayout>
