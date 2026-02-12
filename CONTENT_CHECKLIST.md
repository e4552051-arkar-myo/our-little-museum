# Content Checklist

## Import My Photos (Important)
I will replace placeholder files but keep filenames stable.

Put your image files in `public/photos` using these exact filenames:
- `photo-001.jpg`
- `photo-002.jpg`
- `photo-003.jpg`
- `photo-004.jpg`
- `photo-005.jpg`
- `photo-006.jpg`
- `photo-007.jpg`
- `photo-008.jpg`
- `photo-009.jpg`
- `photo-010.jpg`
- `photo-011.jpg`
- `photo-012.jpg`

If you keep these names unchanged, you only need to replace the file contents and the app will update automatically.

## Add/Update Memories (Albums/Tags + Dates)
Edit: `src/data/memories.ts`

Each memory object looks like:
```ts
{
  id: "m013",
  src: "/photos/photo-013.jpg",
  caption: "Short caption here.",
  date: "2024-06-20",
  location: "Optional place",
  tags: ["travel", "summer"]
}
```

Rules:
- `id` must be unique.
- `src` should match a real file in `public/photos`.
- `date` format must be `YYYY-MM-DD`.
- `tags` controls album filtering in Gallery.
- Add new tag words freely (for example: `anniversary`, `road-trip`, `home`).

## Write Letters in Markdown
Edit: `src/data/letters.ts`

Each letter object looks like:
```ts
{
  id: "l009",
  title: "Sweet Title",
  date: "2024-10-10",
  preview: "One-line teaser",
  markdown: `# Sweet Title\n\nYour letter text...`
}
```

Markdown examples you can use in `markdown`:
```md
# Big Heading
## Smaller Heading

A normal paragraph with **bold** and *italic* text.

- Bullet one
- Bullet two

> A quoted line
```

## Set "Locked Until" Dates
In `src/data/letters.ts`, add `lockedUntil` to any letter:
```ts
lockedUntil: "2026-12-25"
```

Rules:
- Use `YYYY-MM-DD`.
- The letter stays locked until that date on the user device.

## Passcode
A passcode is not currently implemented.

If you want one, easiest approach:
1. Add `passcodeHash` in a new config file (or `.env.local` for private usage).
2. Create a small gate component that asks for a code before showing `/gallery` and `/letters`.
3. Save unlock state in `localStorage` (for example key: `olm_passcode_ok`).

Minimal client-side approach (quick, not secure):
- Compare typed code to a hardcoded string in a client component.
- On success, set `localStorage` flag and render children.

If you want, I can implement a proper passcode gate next.
