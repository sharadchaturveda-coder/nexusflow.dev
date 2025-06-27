# Deployment

This document describes the deployment process for the Nexus Flow AI application, focusing on the recommended GitHub to Vercel pipeline and associated branch rules.

## Recommended Deployment: Vercel

The recommended platform for deploying this Next.js project is [Vercel](https://vercel.com), the creators of Next.js. Vercel offers seamless integration with GitHub and provides an optimized deployment environment for Next.js applications.

### Deployment Pipeline (GitHub → Vercel)

1.  **Version Control**: Ensure your project code is pushed to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  **Import Project**: Log in to your Vercel account and import your Git repository as a new project. Vercel will automatically detect that it's a Next.js application.
3.  **Environment Variables**: Configure all necessary environment variables (as listed in `docs/setup.md`) within your Vercel project settings.
    *   For production deployments, ensure sensitive variables are marked as "Secret".
    *   Vercel automatically handles `.env.local` for local development, but for deployments, variables must be explicitly set in the Vercel dashboard or via the Vercel CLI.
4.  **Automatic Builds**: Vercel automatically builds and deploys your application on every push to the configured Git branches (typically `main` or `master`).
5.  **Instant Previews**: For every pull request, Vercel creates a unique preview deployment URL, allowing for easy review and testing of changes before merging to production.
6.  **Production Deployment**: Merging changes to the production branch (e.g., `main`) triggers a production deployment, updating your live application.

### Branch Rules and Environments

*   **`main` / `master` branch**: This branch should be configured to deploy to the **Production** environment on Vercel. Only thoroughly tested and reviewed code should be merged here.
*   **Feature / Development branches**: Pushing to any other branch (e.g., `feature/new-feature`, `develop`) will trigger a **Preview** deployment on Vercel. These preview URLs are ephemeral and useful for testing and sharing work in progress.
*   **Pull Request Previews**: Vercel automatically creates a preview deployment for every new pull request, which updates as new commits are pushed to the PR branch.

## Other Deployment Platforms

While Vercel is recommended, the project can be deployed to other platforms that support Node.js applications. You will need to manually configure the build and start commands:

*   **Build command**: `npm run build` (or `yarn build`)
*   **Start command**: `npm run start` (or `yarn start`)

Ensure that your chosen platform supports server-side rendering (SSR) and API routes, as these are core features of Next.js. You will also need to manage environment variables and secrets according to the platform's specific guidelines.