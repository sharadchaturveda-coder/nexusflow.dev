# `AuthenticatedButtons` Component

This component displays a dropdown menu for authenticated users, providing links to their dashboard, account, and a sign-out option.

## Props

*   `isMobile` (optional): A boolean indicating if the component is rendered in a mobile context, affecting styling.

## Usage

```typescript
import AuthenticatedButtons from '@/components/auth/AuthenticatedButtons';

<AuthenticatedButtons isMobile={false} />;
