# Deployment

## Requirements
- Environment variables: **none required** for this project.

## Option 1: Vercel Dashboard (GitHub Import)
1. Push your repo to GitHub.
2. Go to Vercel: `Add New` -> `Project`.
3. Import `our-little-museum`.
4. Keep defaults (Framework: Next.js, Build Command: `npm run build`).
5. Click `Deploy`.

## Option 2: Vercel CLI
1. Install CLI:
```bash
npm i -g vercel
```
2. From project root:
```bash
vercel
```
3. For production deploy:
```bash
vercel --prod
```

## Safari iPhone Test (including PWA)
1. Open the deployed URL in **Safari** on iPhone.
2. Verify core flow:
- Gift Wrap (`Unwrap 💝`)
- Gallery modal open/close + scroll lock behavior
- Letter Box open/lock behavior
3. Add to Home Screen:
- Tap **Share** -> **Add to Home Screen** -> **Add**.
4. Launch from Home Screen and confirm:
- App opens standalone
- Icon appears correctly
- Basic navigation works offline/poor network (at least shell loads).
