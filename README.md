# Acowale Feedback Frontend

Next.js 15 frontend for the Acowale Feedback Platform.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev -- --hostname localhost --port 3001
```

The backend defaults to `http://localhost:3000`, so `.env.local` should contain:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

For cookie auth to work during local development, run the sibling backend with `CLIENT_URL` set to the exact frontend origin, for example:

```bash
CLIENT_URL=http://localhost:3001
```

## Pages

- `/` public feedback submission
- `/login` admin login
- `/dashboard` protected dashboard with analytics, charts, filters, status updates, and deletion
