export type Letter = {
  id: string;
  title: string;
  date: string;
  preview: string;
  markdown: string;
  lockedUntil?: string;
  surprise?: boolean;
};

export const letters: Letter[] = [
  {
    id: "l001",
    title: "A Soft Hello",
    date: "2023-02-12",
    preview: "A tiny beginning that still feels warm.",
    markdown: `# A Soft Hello\n\nThis is where we can keep the story simple and true.\n\n- One gentle moment\n- One kind smile\n- One memory worth saving`,
  },
  {
    id: "l002",
    title: "Rainy Day Note",
    date: "2023-03-19",
    preview: "Small umbrella, big comfort.",
    markdown: `# Rainy Day Note\n\nThank you for making ordinary weather feel special.\n\n> Even simple days can be beautiful with the right person.`,
  },
  {
    id: "l003",
    title: "Kitchen Playlist",
    date: "2023-04-13",
    preview: "A little dance between chores.",
    markdown: `# Kitchen Playlist\n\nNo perfect steps needed.\nJust music, warm light, and time together.`,
  },
  {
    id: "l004",
    title: "Museum Promise",
    date: "2023-08-09",
    preview: "A memory worth revisiting.",
    markdown: `# Museum Promise\n\nThis app is a gentle place to keep our favorite moments and update them whenever we want.`,
  },
  {
    id: "l005",
    title: "Midnight Wishes",
    date: "2024-01-01",
    preview: "Simple hopes for everyday life.",
    markdown: `# Midnight Wishes\n\nI hope for calm mornings, shared laughter, and many good ordinary days.`,
  },
  {
    id: "l006",
    title: "Cozy Weekend",
    date: "2024-02-17",
    preview: "Home can be a feeling.",
    markdown: `# Cozy Weekend\n\nThis letter is a placeholder you can quickly rewrite with your own details and inside jokes.`,
  },
  {
    id: "l007",
    title: "Sunny Afternoon",
    date: "2024-05-09",
    preview: "A short note for bright days.",
    markdown: `# Sunny Afternoon\n\nToday felt light, easy, and full of little smiles.`,
    lockedUntil: "2026-03-01",
  },
  {
    id: "l008",
    title: "Always in the Small Things",
    date: "2024-09-20",
    preview: "Care in tiny details.",
    markdown: `# Always in the Small Things\n\n- Tea made the way I like it\n- A text at the right time\n- The quiet comfort of being understood`,
  },
  {
    id: "l999",
    title: "Surprise Letter",
    date: "2026-02-14",
    preview: "Unlocked for devoted museum visitors.",
    surprise: true,
    markdown: `# Surprise Letter\n\nYou stayed curious and kept opening memories.\n\nThank you for caring for this little museum.`,
  },
];
