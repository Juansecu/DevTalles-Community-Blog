# DevTalles - Community Blog Backend

Backend for DevTalles community blog.

## Requirements

- **[Node.js](https://nodejs.org/) -** (v22.18 or higher)
- **[pnpm](https://pnpm.io/) -** (v10.15.0 or higher)
- **[PostgreSQL](https://www.postgresql.org/) -** (v17 or higher)
- **Environment variables**

    | Variable            | Type   | Description                                                                      | Required | Default     | Example                 |
    |---------------------|--------|----------------------------------------------------------------------------------|----------|-------------|-------------------------|
    | `NODE_ENV`          | String | Application environment (production is the recommended and only available value) | No       | None        | `production`            |
    | `PORT`              | Number | Port on which the application will run                                           | No       | `3000`      | `8080`                  |
    | `POSTGRES_DATABASE` | String | Name of the PostgreSQL database to connect to                                    | Yes      | None        | `<PostgreSQL Database>` |
    | `POSTGRES_HOST`     | String | Host address where the PostgreSQL server is running                              | No       | `localhost` | `postgres.example.com`  |
    | `POSTGRES_PASSWORD` | String | Password for PostgreSQL authentication                                           | Yes      | None        | `<PostgreSQL Password>` |
    | `POSTGRES_PORT`     | Number | Port on which the PostgreSQL server is listening                                 | No       | `5432`      | `50005`                 |
    | `POSTGRES_USER`     | String | Username for PostgreSQL authentication                                           | Yes      | None        | `<PostgreSQL User>`     |

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
