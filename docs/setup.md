# Setup

This document outlines the steps required to set up the development environment for the project.

## Prerequisites

Ensure you have the following software installed:

*   Node.js (LTS version, e.g., v18.x or v20.x)
*   npm (Node Package Manager, usually comes with Node.js)
*   Git
*   A code editor (e.g., VS Code)

## Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd nexusflow.dev
    ```

2.  **Install dependencies:**
    Navigate to the project root directory and install the required Node.js packages:
    ```bash
    npm install
    ```

## Configuration

### Environment Variables

Create a `.env.local` file in the project root based on `.env.example` (if available) and populate it with necessary environment variables.

```
# Example .env.local content
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret
GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret
```

### Database Setup

If using a database, ensure it is running and accessible. For Supabase, follow their setup instructions to link your project.

## Running the Development Server

To start the development server:

```bash
npm run dev
```

The application will typically be accessible at `http://localhost:3000`.

## Running Tests

To execute tests:

```bash
npm test
```

## Linting and Formatting

To check for linting errors and format code:

```bash
npm run lint
npm run format