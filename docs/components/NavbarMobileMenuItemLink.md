# `NavbarMobileMenuItemLink` Component

A reusable component for rendering a navigation link within a Headless UI `Menu.Item` for mobile navigation.

## Props

*   `href`: The destination URL for the link.
*   `children`: The content to be displayed as the link text.

## Usage

```typescript
import MobileMenuItemLink from '@/components/NavbarMobileMenuItemLink';
import { Menu } from '@headlessui/react';

<Menu.Items>
  <MobileMenuItemLink href="/dashboard">Dashboard</MobileMenuItemLink>
</Menu.Items>
