# Nobins

Nobins is a zero-knowledge pastebin for sharing encrypted text.

The browser encrypts paste content before it is sent to the server. The server stores encrypted data and never receives the decryption key.

> Paste links keep the decryption key after the `#` hash.<br> Browsers do not send that hash fragment to the server, so the key stays client-side.

## Stack

- Next.js
- React
- TypeScript
- Drizzle
- Postgres

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@host:5432/database
```

Run database migrations:

```bash
npm run db:migrate
```

Seed sample pastes:

```bash
npm run db:seed
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run dev          # start local development
npm run build        # build for production
npm run start        # start production server
npm run check        # type-check, lint, and format check
npm run lint         # run eslint
npm run format       # format files
npm run db:generate  # generate drizzle migrations
npm run db:migrate   # run drizzle migrations
npm run db:seed      # seed sample pastes
npm run db:studio    # open drizzle studio
```
