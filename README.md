# Our Little Museum

A production-ready Next.js (App Router) memory web app with:
- Gift-wrap intro flow (`Unwrap 💝`)
- Home with two entry cards (Gallery + Letter Box)
- Gallery timeline, album tags, lightbox, captions/date/location, and per-photo `💗 react` stored in `localStorage`
- Letter Box envelope grid with open animation and markdown-rendered letters
- Optional date lock per letter
- Hidden Surprise Letter unlock (after opening 5 letters or viewing 20 photos)
- Local passcode lock for Gallery + Letter Box (one-time unlock per device)
- PWA setup (manifest, service worker, app icons)
- Music toggle UI (plays local file if available)

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS (v4)
- `react-markdown` for rendering letter markdown content

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open:
```text
http://localhost:3000
```

## Production Build Check

```bash
npm run build
npm start
```

## Where To Put Your Photos and Music

- Add photos to: `public/photos`
- Update photo metadata in: `src/data/memories.ts`
- Add optional background music file to: `public/music/love-theme.mp3`
- Import note: replace placeholder photo files, but keep filenames stable.

If the music file is missing, the toggle stays visible but shows unavailable behavior.

## How To Edit Letters

- Edit letter content in: `src/data/letters.ts`
- Write each letter in markdown inside the `markdown` field
- Optional lock date uses `lockedUntil: "YYYY-MM-DD"`
- The surprise letter is included in the same file (`id: l999`) and is hidden until unlock conditions are met

## Deploy to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import the project in Vercel.
3. Framework preset: **Next.js** (auto-detected).
4. Build command: `npm run build`.
5. Output: default Next.js output.
6. Deploy.

No external database or environment variables are required for the current version.

## Passcode Lock

- Passcode config lives in: `src/lib/passcode.ts`
- Change `PASSCODE` to your preferred value.
- Unlock state is saved in browser `localStorage` (`STORAGE_KEY` in same file).
- Use the `Lock` button in the header to clear local unlock state on that device.
