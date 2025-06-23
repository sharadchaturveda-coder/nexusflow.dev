# `useAuthStatus` Hook

This hook provides authentication status and functions for signing in and out using NextAuth.js.

## Usage

```typescript
import { useAuthStatus } from '@/lib/hooks/useAuthStatus';

const { session, status, signIn, signOut } = useAuthStatus();
```

## Returns

*   `session`: The user session object.
*   `status`: The authentication status (`'loading'`, `'authenticated'`, `'unauthenticated'`).
*   `signIn`: Function to initiate sign-in.
*   `signOut`: Function to initiate sign-out.
