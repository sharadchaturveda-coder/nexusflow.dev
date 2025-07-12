# Deployment

This document outlines the process for deploying the application to production environments.

## Overview

The project is a Next.js application, optimized for deployment on Vercel. The deployment process is largely automated through Git integration.

## Vercel Deployment

### Prerequisites

*   A Vercel account.
*   The Vercel CLI installed (optional, but recommended for local testing and linking).
    ```bash
    npm i -g vercel
    ```

### Linking to Vercel Project

If not already linked, navigate to the project root and run:

```bash
vercel link
```

Follow the prompts to link your local project to a Vercel project.

### Environment Variables

Ensure all necessary environment variables are configured in your Vercel project settings. These typically include API keys, database credentials, and other sensitive information.

1.  Go to your Vercel project dashboard.
2.  Navigate to "Settings" -> "Environment Variables".
3.  Add all required variables (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `NEXTAUTH_SECRET`).

### Deployment Triggers

*   **Git Integration:** The recommended deployment method is through Git integration (e.g., GitHub, GitLab, Bitbucket). Every push to the configured production branch (commonly `main` or `master`) will trigger a new deployment.
*   **Manual Deployment:** You can also trigger a deployment manually from the Vercel dashboard or via the Vercel CLI:
    ```bash
    vercel --prod
    ```

## Post-Deployment Checks

After deployment, verify the following:

*   **Application Accessibility:** Ensure the deployed application is accessible at its URL.
*   **Functionality:** Test key features to confirm they are working as expected.
*   **Logs:** Monitor Vercel deployment logs for any errors or warnings.
*   **Environment Variables:** Confirm that environment variables are correctly loaded and applied.