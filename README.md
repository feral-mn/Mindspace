# Mindspace

Save links (YouTube, X, Pinterest, any page) into named spaces like "Fit Ideas", and share a space with friends through one link.

**Stack:** MongoDB · Express · React (Vite) · Node · Tailwind CSS v4

## Quick start

Requirements: Node 18+ and a MongoDB instance (local or Atlas).

```bash
npm run install:all                  # installs root, server and client deps
cp server/.env.example server/.env   # then edit MONGO_URI and JWT_SECRET
npm run dev                          # API on :5000, web app on :5173
```

Open http://localhost:5173. In dev, Vite proxies `/api` to Express, so CORS is not an issue.

## Folder structure

```
mindspace/
├── server/src/
│   ├── config/         env validation, DB connection
│   ├── models/         Mongoose schemas (User, Mindspace, Item)
│   ├── routes/         URL → controller wiring (one file per resource)
│   ├── controllers/    request handlers (thin, readable)
│   ├── services/       business logic that is not HTTP (link previews)
│   ├── middleware/     auth, validation, error handling
│   ├── utils/          ApiError, asyncHandler, token helpers, zod schemas
│   ├── app.js          Express setup (helmet, CORS, rate limit, routes)
│   └── server.js       entry point
└── client/src/
    ├── api/            axios instance + one file per API resource
    ├── context/        AuthContext (login state)
    ├── routes/         AppRoutes, ProtectedRoute, GuestRoute
    ├── layouts/        AppLayout (logged in), AuthLayout (login/register)
    ├── pages/          one file per screen
    ├── components/     reusable UI pieces
    ├── utils/          small pure helpers
    └── styles/         Tailwind theme tokens (colors, fonts)
```

**Rule of thumb:** routes say *where*, controllers say *what*, services say *how*, models say *shape*.

## API

| Method | Endpoint | Auth | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | no | Create account |
| POST | `/api/auth/login` | no | Log in, returns JWT |
| GET | `/api/auth/me` | yes | Current user |
| GET | `/api/mindspaces` | yes | List your spaces |
| POST | `/api/mindspaces` | yes | Create a space |
| GET | `/api/mindspaces/:id` | yes | Space + its links |
| PATCH | `/api/mindspaces/:id` | yes | Rename / edit |
| DELETE | `/api/mindspaces/:id` | yes | Delete space and its links |
| POST | `/api/mindspaces/:id/share` | yes | Toggle public sharing |
| POST | `/api/mindspaces/:mindspaceId/items` | yes | Save a link (fetches preview) |
| PATCH | `/api/items/:id` | yes | Edit note/title |
| DELETE | `/api/items/:id` | yes | Remove a link |
| GET | `/api/share/:slug` | no | Public read-only view |

## Frontend routes

| Path | Access | Page |
|---|---|---|
| `/` | public | Landing |
| `/login`, `/register` | guests only | Auth |
| `/m/:slug` | public | Shared space |
| `/app` | logged in | Dashboard |
| `/app/mindspaces/:id` | logged in | A space with its links |

## Adding a new feature (example: tags)

1. `models/Item.js`: add a `tags: [String]` field
2. `utils/schemas.js`: extend the zod schema
3. `controllers/item.controller.js`: handle it
4. `client/src/api/mindspace.api.js`: send it
5. `components/`: show it

## Chrome extension later

The API already accepts requests from `chrome-extension://` origins. The extension only needs a popup that calls `POST /api/mindspaces/:id/items`. Reuse `client/src/api/*` as is. Two changes inside the extension build:

- Use `HashRouter` instead of `BrowserRouter` (`client/src/main.jsx`)
- Store the token with `chrome.storage.local` (swap `tokenStore` in `client/src/api/client.js`)

Set `VITE_API_URL` to the deployed API (extensions cannot use the Vite proxy), and list that URL in `host_permissions`.

## Deploy

- **API:** Render / Railway. Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your frontend URL).
- **Web:** Vercel / Netlify. Set `VITE_API_URL` to `https://<your-api>/api`. Add a rewrite of all paths to `/index.html` so React Router works on refresh.

## Good next steps

- Edit notes on existing links (API is ready: `PATCH /api/items/:id`)
- Search and filter inside a space
- Private spaces shared by invite
- Tests (Vitest on the client, Supertest on the API)
- Stronger SSRF protection in `linkPreview.service.js` (resolve DNS and block private IPs)
# Mindspace
