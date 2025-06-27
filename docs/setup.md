# Setup

This guide provides detailed instructions for setting up the Nexus Flow AI project for local development, including environment variables and secrets management.

## Prerequisites

*   Node.js (v18.x or higher)
*   npm or yarn

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [repository-url]
    cd nexusflow
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

## Environment Variables and Secrets

Create a `.env.local` file in the root of your project. This file will store sensitive information and configuration specific to your local environment. **Do not commit this file to version control.**

### Required Environment Variables

While the project can run locally with minimal setup, certain features require specific environment variables.

*   `NEXTAUTH_URL`: The base URL for NextAuth. In development, this is typically `http://localhost:3000`.
    ```
    NEXTAUTH_URL=http://localhost:3000
    ```
*   `NEXTAUTH_SECRET`: A random string used to sign and encrypt NextAuth.js cookies. Generate a strong, random string for this.
    ```
    NEXTAUTH_SECRET=your_super_secret_random_string_here
    ```
*   `OPENAI_API_KEY`: Your OpenAI API key for accessing GPT models.
    ```
    OPENAI_API_KEY=sk-your_openai_api_key
    ```
*   `SUPABASE_URL`: Your Supabase project URL.
    ```
    SUPABASE_URL=https://your-project-id.supabase.co
    ```
*   `SUPABASE_ANON_KEY`: Your Supabase public anon key.
    ```
    SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
*   `RAZORPAY_KEY_ID`: Your Razorpay Key ID for payment gateway integration.
    ```
    RAZORPAY_KEY_ID=rzp_test_your_key_id
    ```
*   `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret.
    ```
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```
*   `ADMIN_TOKEN`: A secret token for accessing administrative API routes.
    ```
    ADMIN_TOKEN=your_admin_secret_token
    ```
*   `INSTAGRAM_VERIFY_TOKEN`: Token for Instagram webhook verification.
    ```
    INSTAGRAM_VERIFY_TOKEN=your_instagram_verify_token
    ```
*   `FACEBOOK_VERIFY_TOKEN`: Token for Facebook webhook verification.
    ```
    FACEBOOK_VERIFY_TOKEN=your_facebook_verify_token
    ```
*   `WHATSAPP_VERIFY_TOKEN`: Token for WhatsApp webhook verification.
    ```
    WHATSAPP_VERIFY_TOKEN=your_whatsapp_verify_token
    ```

### Example `.env.local`

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a_very_long_and_random_string_for_nextauth_security
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_URL=https://abcde12345.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
ADMIN_TOKEN=supersecretadminpassword
INSTAGRAM_VERIFY_TOKEN=instagram_secret
FACEBOOK_VERIFY_TOKEN=facebook_secret
WHATSAPP_VERIFY_TOKEN=whatsapp_secret
```

## Running the Development Server

After installing dependencies and setting up environment variables, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.