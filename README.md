# Tanay Tourist Spots (Next.js Redesign)

A full migration of the old static site into a modern Next.js app using:

- React (Next.js App Router)
- Tailwind CSS
- Lucide React icons
- shadcn/ui-style component architecture

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Routes

- `/` Home
- `/sightseeing`
- `/lodging`
- `/destinations/[slug]`
- `/contact`

## Data architecture (CMS/API-ready)

Current content is local and typed, with a repository/service layer for easy future API/CMS integration:

- `lib/data/types.ts`
- `lib/data/destinations.ts`
- `lib/data/repositories/destination-repository.ts`
- `lib/data/services/destination-service.ts`

Swap `LocalDestinationRepository` with an API-backed implementation when ready.

## Contact form

The contact form currently provides **client-side validation and submission UX only**.
It is intentionally built to be backend-pluggable later.
