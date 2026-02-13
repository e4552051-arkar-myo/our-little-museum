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
Passcode is implemented locally (no backend).

Where to change it:
- Edit `src/lib/passcode.ts`
- Update `PASSCODE` constant
- Optional hint text: `PASSCODE_HINT`

How unlock works:
- Gallery and Letter Box are gated.
- After correct passcode entry, unlock is stored in `localStorage` using `STORAGE_KEY`.
- On that device/browser, user only enters once unless lock is cleared.
- Use the `Lock` button in the header to clear unlock and require passcode again.
