# Getting Started

This guide will walk you through setting up the project for local development.

## Prerequisites

- Node.js (v18.x or higher)
- npm or yarn

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the necessary environment variables. See `docs/04-environment-variables.md` for a complete list.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

The application will be available at `http://localhost:3000`.
