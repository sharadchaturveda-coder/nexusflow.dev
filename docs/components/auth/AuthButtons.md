# `AuthButtons` Component

This component conditionally renders authentication buttons based on the user's session status. It uses `UnauthenticatedButton` for guests and `AuthenticatedButtons` for logged-in users.

## Props

*   `isMobile` (optional): A boolean indicating if the component is rendered in a mobile context, affecting styling.

## Usage

```typescript
import AuthButtons from '@/components/auth/AuthButtons';

<AuthButtons isMobile={true} />;
