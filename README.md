# DevTalles - Community Blog

Blog for DevTalles community.

## Requirements

- **[Node.js](https://nodejs.org/) -** (v22.18.0 or higher)
- **[pnpm](https://pnpm.io/) -** (v10.15.0 or higher)
- **[Discord Application (for authenticating users via Discord)](https://github.com/Juansecu/DevTalles-Community-Blog/wiki/setting-up-discord-oauth2)**
- **[Cloudflare R2 (for storing user avatar images and post images)](https://developers.cloudflare.com/r2/)**
- **[Cloudflare Turnstile (for secure access to the backend)](https://developers.cloudflare.com/turnstile/get-started/)**
- **[Terraform (for deploying the necessary infrastructure to Cloudflare)](https://developer.hashicorp.com/terraform)**

### For Development

- **[EditorConfig](https://editorconfig.org/)**
- **[ESLint](https://eslint.org/)**
- **[Git](https://git-scm.com/)**
- **[Prettier](https://prettier.io/)**

## Project Setup

This project uses a monorepo structure with two main directories:
`backend` and `frontend`. Each directory contains its own `README.md` file
with specific requirements and setup instructions.

Before starting, if you haven't created a Cloudflare R2 bucket
or a Turnstile widget yet, please follow the instructions
in this repository's wiki
about [setting up Cloudflare Turnstile using Terraform templates](https://github.com/Juansecu/DevTalles-Community-Blog/wiki/setting-up-cloudflare-infrastructure#using-terraform-templates-recommended).

To set up the entire project, follow these steps:

### For Development

Before starting, you must know that the root directory
contains a `pnpm-workspace.yaml` file that defines the workspace for the
monorepo. This allows you to manage dependencies and scripts for both the
backend and frontend from the root directory.

**Note:** Always prefer to install dependencies from the root directory to ensure
that all packages are correctly linked.

1. Clone the repository:

    ```console
    $ git clone git@github.com:Juansecu/DevTalles-Community-Blog.git
    $ cd DevTalles-Community-Blog
    ```

2. Install dependencies for both backend and frontend:

    ```console
    $ pnpm install
    ```

3. Check the `README.md` files in both the `backend` and `frontend` directories
   for any additional setup instructions.
4. You can run the following commands from the root directory to start both
   the backend and frontend in development mode:

    ```console
    # Start the backend in watch mode
    $ pnpm --filter @devtalles/community-blog-backend run start:dev

    # Start the frontend in development mode
    $ pnpm --filter @devtalles/community-blog-frontend start
    ```
