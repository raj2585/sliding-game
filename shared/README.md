# Jodhpur Sliding Puzzle

A minimalist sliding puzzle game themed around Jodhpur’s iconic landmarks. Built for calm focus and clean interactions.

Live: https://sliding-game.vercel.app/

## Features
- Elegant 4x4 sliding puzzle with smooth animations
- Keyboard controls using arrow keys for quick play (`src/pages/game.tsx:178-214`)
- Personal best tracking stored locally per player and image
- Image preview while playing
- Modern UI with accessible components

## Tech Stack
- React 18 + Vite 5
- Tailwind CSS + shadcn/ui (Radix primitives)
- Framer Motion for animations
- Wouter for routing
- Lucide icons

## Getting Started

Prerequisites
- Node.js 18+ recommended
- npm

Install
```sh
npm install
```

Run in development
```sh
npm run dev
```
Open the local URL printed by Vite (typically http://localhost:5173).

Type-check
```sh
npm run check
```

Build for production
```sh
npm run build
```

Preview production build locally
```sh
npm run preview
```

## Project Structure
- `src/` React app
  - `pages/` routing views (`src/App.tsx:12-21` defines routes)
  - `components/` UI components
  - `lib/` helpers (query client, storage, utils)
- `shared/schema.ts` shared types and puzzle image metadata
- `public/` static assets served at site root

## Images
All puzzle images are local assets served from `public/images/`. Update paths and names in:
- `shared/schema.ts:1-38`

Example entry
```ts
ghantaGhar: {
  id: "ghantaGhar",
  name: "Ghanta Ghar",
  url: "/images/ghanta-ghar.jpg",
  credit: "Ghanta Ghar",
}
```

Add or replace files in:
- `public/images/mehrangarh.jpg`
- `public/images/blue-city.jpg`
- `public/images/ghanta-ghar.jpg`
- `public/images/umaid-bhavan.jpg`
- `public/images/jaswant-thada.jpg`
- `public/images/stepwell.jpg`

## Routing
SPA routing uses Wouter. Main routes in `src/App.tsx:12-21`:
- `/` landing
- `/enter` set player name
- `/select` pick a landmark
- `/game` play

For SPA deployments, ensure all routes rewrite to `index.html`.

## Vercel Deployment
The project is deployed at: https://sliding-game.vercel.app/

Recommended settings
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrites (optional `vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Notable Code
- Keyboard input and sliding logic entry: `src/pages/game.tsx:178-214`
- Win detection and score save: `src/pages/game.tsx:149-166`
- Route definitions: `src/App.tsx:12-21`
- Path aliases: `vite.config.ts:8-11` (`@` → `src`, `@shared` → `shared`)
- Image metadata: `shared/schema.ts:1-38`

## License
MIT