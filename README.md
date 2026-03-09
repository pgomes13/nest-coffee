# nest-coffee

A NestJS REST API for managing coffees, with a full IAM layer covering JWT, API key, session, Google OAuth, and two-factor authentication.

## Tech stack

- **Framework** – NestJS + TypeScript
- **Database** – PostgreSQL via TypeORM
- **Cache / Sessions** – Redis
- **Auth** – JWT (Bearer + Refresh tokens), API Keys, Sessions (Passport), Google OAuth, TOTP 2FA
- **Docs** – OpenAPI / Swagger (`/api`)
- **CI** – API drift detection via [drift-guard](https://github.com/pgomes13/drift-guard-engine)

## Prerequisites

- Node.js 20+
- pnpm
- Docker (for PostgreSQL and Redis)

## Setup

```bash
# Start infrastructure
docker-compose up -d

# Install dependencies
pnpm install
```

Copy `.env.example` to `.env` and fill in the required values.

## Running

```bash
# Development (watch mode)
pnpm start:dev

# Production
pnpm build
pnpm start:prod
```

Swagger UI is available at `http://localhost:3000/api`.

## Testing

```bash
# Unit tests
pnpm test

# e2e tests
pnpm test:e2e

# Coverage
pnpm test:cov
```

## API

### Authentication — `/authentication`

| Method | Path | Description | Auth required |
|--------|------|-------------|---------------|
| POST | `/authentication/sign-up` | Register a new user | No |
| POST | `/authentication/sign-in` | Sign in, returns access + refresh tokens | No |
| POST | `/authentication/refresh-tokens` | Exchange a refresh token for new tokens | No |
| POST | `/authentication/2fa/generate` | Generate a TOTP QR code (enables 2FA) | Bearer |

### Google OAuth — `/authentication/google`

| Method | Path | Description | Auth required |
|--------|------|-------------|---------------|
| POST | `/authentication/google` | Authenticate with a Google ID token | No |

### Session auth — `/session-authentication`

| Method | Path | Description | Auth required |
|--------|------|-------------|---------------|
| POST | `/session-authentication/sign-in` | Sign in via session cookie | No |
| GET | `/session-authentication` | Verify session | Session cookie |

### Coffees — `/coffees`

Requires **Bearer token** or **API key** on all routes.

| Method | Path | Description | Role / Permission |
|--------|------|-------------|-------------------|
| GET | `/coffees` | List all coffees (paginated) | Any authenticated user |
| GET | `/coffees/:id` | Get a coffee by ID | Any authenticated user |
| POST | `/coffees` | Create a coffee | `CreateCoffee` permission |
| PATCH | `/coffees/:id` | Update a coffee | `Admin` role |
| DELETE | `/coffees/:id` | Delete a coffee | `Admin` role |

### Users — `/users`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/users` | Create a user |
| GET | `/users` | List all users |
| GET | `/users/:id` | Get a user by ID |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

## CI — API Drift Check

On every pull request, the [drift-guard-engine](https://github.com/pgomes13/drift-guard-engine) action:

1. Generates the OpenAPI spec for both the base branch and the PR branch.
2. Compares them and reports breaking / non-breaking changes.
3. Posts a summary comment on the PR.
4. Appends a timestamped entry to the GitHub Pages drift log.

## License

MIT
