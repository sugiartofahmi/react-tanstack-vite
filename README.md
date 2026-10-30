# react-vite-tanstack

A production-grade React + Vite + TanStack boilerplate adopting a modern route-colocated feature-sliced architecture. Ships with three complete flows (Login, Register, Dashboard) wired against typed API layers with Zod schemas and standard error boundaries.

## Stack

- **React 19** + **Vite 8**
- **TanStack Router**: file-based routing with router context, loaders, and route-level permissions
- **TanStack Query**: server state management via `queryOptions` and `useSuspenseQuery`
- **TanStack Form**: form handling with Zod validation
- **TanStack Store**: client UI and permission state
- **TanStack Table**: headless data tables
- **TanStack Virtual**: high-performance list and table virtualization
- **shadcn/ui** + Tailwind v4: UI primitives
- **Biome**: ultra-fast formatting and linting
- **Vitest** + **Playwright**: colocated unit tests and E2E specs

## Prerequisites

- **Node.js**: `>=22.0.0`
- **pnpm**: `>=10.0.0`

## Getting started

```bash
pnpm install
cp .env.example .env   # optional, falls back to sane defaults if skipped
pnpm dev
```

## Scripts

| Script                              | What it does                                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `pnpm dev`                          | Start the dev server                                                                                              |
| `pnpm build`                        | Production build (`vite build` first, then `tsc`, in that order so `routeTree.gen.ts` exists before typechecking) |
| `pnpm preview`                      | Preview the production build                                                                                      |
| `pnpm lint`                         | Biome lint                                                                                                        |
| `pnpm format` / `pnpm format:check` | Biome write / check                                                                                               |
| `pnpm check`                        | Biome check and fix format + lint                                                                                 |
| `pnpm test`                         | Unit tests (vitest)                                                                                               |
| `pnpm test:watch`                   | Unit tests in watch mode                                                                                          |
| `pnpm test:coverage`                | Unit tests with coverage                                                                                          |
| `pnpm test:e2e`                     | e2e tests (playwright, spins up the dev server automatically)                                                     |
| `pnpm test:e2e:ui`                  | e2e tests with the Playwright UI                                                                                  |

## Project structure

```
src/
  main.tsx                 # Root entrypoint, renders <RouterProvider>
  router.tsx               # getRouter(): context, error & 404 boundaries, preloading
  components/
    ui/                    # shadcn UI primitives + app shell (app-sidebar, navbar)
    layouts/               # ProtectedLayout, PublicLayout
    section-boundary.tsx   # Declarative Suspense + ErrorBoundary wrapper
    route-error-screen.tsx # Route-level error and 403 Forbidden handler
    not-found.tsx          # Default 404 page
  libs/
    axios/client.ts        # Axios instance with auth & 401 interceptor
    auth/                  # Session resolution, token cookies, and /me query
    permissions/           # PERMISSION constants, canAll/canAny, Guard, and route-guard
    socket/client.ts       # Socket.IO client singleton
    tanstack-query/        # Query client singleton & devtools
    utils.ts               # cn() helper
  routes/
    __root.tsx             # Root route: beforeLoad resolves session & sets permissions
    index.tsx              # Landing page (with _components/)
    _public/               # Pathless public layout (redirects to /dashboard if logged in)
      login/               # _schema/, _hooks/, _components/, index.tsx
      register/            # _schema/, _hooks/, _components/, index.tsx
    _authenticated/        # Pathless layout (redirects to /login if unauthenticated)
      dashboard/           # _hooks/, _components/, _stores/, index.tsx
```

## Architecture principles

1. **Route colocation**: All logic specific to a route (`_hooks/`, `_schema/`, `_stores/`, `_components/`) lives alongside its `index.tsx` route file.
2. **Lean Hooks Layer**: Hooks directly connect to the REST/oRPC client and define `queryOptions()` and mutations without redundant pass-through API wrappers.
3. **Session & Permissions in Router Context**: Session is resolved once at `__root.tsx`'s `beforeLoad`, injecting `{ session, permissions }` into the router context.
4. **Declarative Loading & Errors**: Data is prefetched via `ensureQueryData(queryOptions)` in route `loader`s and rendered with `useSuspenseQuery()` inside `<SectionBoundary>`.
5. **Standardized Subpath Imports**: Internal imports use the standard `#/` prefix with explicit `.ts` / `.tsx` extensions.

## Testing

- **Colocated Unit Tests** (`src/**/__tests__/*.test.{ts,tsx}`): Test files sit directly next to the module under test.
- **E2E Tests** (`e2e/*.spec.ts`): End-to-end user flows run via Playwright.
