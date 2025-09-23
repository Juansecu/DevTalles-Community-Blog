# DevTalles - Community Blog Backend

Backend for DevTalles community blog.

## Requirements

- **[Node.js](https://nodejs.org/) -** (v22.18 or higher)
- **[pnpm](https://pnpm.io/) -** (v10.15.0 or higher)
- **[PostgreSQL](https://www.postgresql.org/) -** (v17 or higher)
   **Environment variables:**

    | Variable                          | Type    | Description                                                                      | Required | Default     | Example                   |
    |-----------------------------------|---------|----------------------------------------------------------------------------------|----------|-------------|---------------------------|
    | `CLOUDFLARE_R2_ACCESS_KEY_ID`     | String  | Access key ID for Cloudflare R2 storage                                          | Yes      | None        | `<R2 Access Key ID>`      |
    | `CLOUDFLARE_R2_BUCKET`            | String  | Name of the Cloudflare R2 bucket                                                 | Yes      | None        | `<R2 Bucket Name>`        |
    | `CLOUDFLARE_R2_BUCKET_HINT`       | String  | Location hint for the Cloudflare R2 bucket (used for generating public URLs)     | No       | `auto`      | `enam`                    |
    | `CLOUDFLARE_R2_ENDPOINT`          | String  | Endpoint URL for Cloudflare R2 storage                                           | Yes      | None        | `<R2 Endpoint URL>`       |
    | `CLOUDFLARE_R2_PUBLIC_DOMAIN`     | String  | Custom domain for accessing Cloudflare R2 objects                                | Yes      | None        | `https://cdn.example.com` |
    | `CLOUDFLARE_R2_SECRET_ACCESS_KEY` | String  | Secret access key for Cloudflare R2 storage                                      | Yes      | None        | `<R2 Secret Access Key>`  |
    | `CORS_ALLOWED_ORIGINS`            | String  | Comma-separated list of allowed origins for CORS                                 | Yes      | None        | `https://example.com`     |
    | `DISCORD_CALLBACK_URL`            | String  | OAuth2 callback URL for Discord authentication                                   | Yes      | None        | `https://example.com`     |
    | `DISCORD_CLIENT_ID`               | String  | Client ID for Discord OAuth2 authentication                                      | Yes      | None        | `<Discord Client ID>`     |
    | `DISCORD_CLIENT_SECRET`           | String  | Client secret for Discord OAuth2 authentication                                  | Yes      | None        | `<Discord Client Secret>` |
    | `JWT_SECRET`                      | String  | Secret key for signing JWT tokens                                                | Yes      | None        | `<JWT Secret>`            |
    | `NODE_ENV`                        | String  | Application environment (production is the recommended and only available value) | No       | None        | `production`              |
    | `PORT`                            | Number  | Port on which the application will run                                           | No       | `3000`      | `8080`                    |
    | `POSTGRES_DATABASE`               | String  | Name of the PostgreSQL database to connect to                                    | Yes      | None        | `<PostgreSQL Database>`   |
    | `POSTGRES_HOST`                   | String  | Host address where the PostgreSQL server is running                              | No       | `localhost` | `postgres.example.com`    |
    | `POSTGRES_PASSWORD`               | String  | Password for PostgreSQL authentication                                           | Yes      | None        | `<PostgreSQL Password>`   |
    | `POSTGRES_PORT`                   | Number  | Port on which the PostgreSQL server is listening                                 | No       | `5432`      | `50005`                   |
    | `POSTGRES_USER`                   | String  | Username for PostgreSQL authentication                                           | Yes      | None        | `<PostgreSQL User>`       |
    | `SECURE_AUTHENTICATION_COOKIES`   | Boolean | Whether to set the `Secure` flag on authentication cookies                       | Yes      | None        | `true`                    |

    **Notes:**

    - You must generate a Cloudflare R2 API Token to obtain
      the `CLOUDFLARE_R2_ACCESS_KEY_ID` and `CLOUDFLARE_R2_SECRET_ACCESS_KEY`.
      The token should have permissions
      to read and write to the specified R2 bucket.
    - For more information on Cloudflare R2 Location Hints,
      see [here](https://developers.cloudflare.com/r2/reference/data-location/).

### For Development

- **[EditorConfig](https://editorconfig.org/)**
- **[ESLint](https://eslint.org/)**
- **[Git](https://git-scm.com/)**
- **[Prettier](https://prettier.io/)**

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# build for production
$ pnpm run build

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## REST API Documentation

The REST API documentation is available at `/api/docs` endpoint
when the application is running.

## License

This project is [MIT licensed](https://github.com/Juansecu/DevTalles-Community-Blog/blob/main/LICENSE).
