# Portfolio

A React + TypeScript portfolio app with a gaming-inspired pixel-art style.

## Features

- **About** – Pixel-art avatar, neon frame, intro paragraph
- **Projects** – Project cards with pixelated logos and links
- **Game** – Snake (play, pause, score, restart, wall collision)
- **Footer** – Contact links (LinkedIn, Instagram, GitHub, phone)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start dev server               |
| `npm run build`| Production build               |
| `npm run preview` | Preview production build   |
| `npm run lint` | Run ESLint                     |

## Customize

1. **About** – Edit intro text and avatar initial in `src/pages/About.tsx`. Pixel face in `src/components/PixelAvatar.tsx`.
2. **Projects** – Edit `projects` in `src/pages/Projects.tsx`; add logo variants in `src/components/PixelProjectLogo.tsx`.
3. **Footer** – Update contact URLs and phone in `src/components/Footer.tsx`.

## Build

```bash
npm run build
npm run preview
```

## Deploy (Vercel)

1. Push the repo to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Vercel will detect Vite and use `npm run build` and `dist/` automatically.
4. Deploy. The `vercel.json` rewrites handle client-side routing (`/projects`, `/game`).
