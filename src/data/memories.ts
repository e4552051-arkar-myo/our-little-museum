export type MemoryPhoto = {
  id: string;
  src: string;
  caption: string;
  date: string;
  location?: string;
  tags: string[];
};

export const memories: MemoryPhoto[] = [
  {
    id: "m001",
    src: "/photos/photo-001.jpg",
    caption: "A gentle beginning at our favorite cafe.",
    date: "2023-02-11",
    location: "Neighborhood Cafe",
    tags: ["firsts", "cozy"],
  },
  {
    id: "m002",
    src: "/photos/photo-002.jpg",
    caption: "A quiet sunset walk with warm conversation.",
    date: "2023-03-02",
    location: "River Walk",
    tags: ["walks", "sunset"],
  },
  {
    id: "m003",
    src: "/photos/photo-003.jpg",
    caption: "A sweet little note hidden in a book.",
    date: "2023-03-22",
    location: "City Library",
    tags: ["letters", "cozy"],
  },
  {
    id: "m004",
    src: "/photos/photo-004.jpg",
    caption: "Slow dance energy in a tiny kitchen.",
    date: "2023-04-13",
    tags: ["home", "funny"],
  },
  {
    id: "m005",
    src: "/photos/photo-005.jpg",
    caption: "Window seat moments on a short trip.",
    date: "2023-05-04",
    tags: ["travel", "cozy"],
  },
  {
    id: "m006",
    src: "/photos/photo-006.jpg",
    caption: "Picnic blanket, fruit, and soft clouds.",
    date: "2023-06-17",
    location: "Maple Hill",
    tags: ["outdoors", "summer"],
  },
  {
    id: "m007",
    src: "/photos/photo-007.jpg",
    caption: "A celebration night with bright lights.",
    date: "2023-07-04",
    tags: ["celebration", "summer"],
  },
  {
    id: "m008",
    src: "/photos/photo-008.jpg",
    caption: "The museum day that inspired this app.",
    date: "2023-08-09",
    location: "Downtown Museum",
    tags: ["museum", "firsts"],
  },
  {
    id: "m009",
    src: "/photos/photo-009.jpg",
    caption: "A simple morning with bakery treats.",
    date: "2023-10-11",
    tags: ["cozy", "autumn"],
  },
  {
    id: "m010",
    src: "/photos/photo-010.jpg",
    caption: "Winter fun and a lot of laughter.",
    date: "2023-12-03",
    tags: ["winter", "funny"],
  },
  {
    id: "m011",
    src: "/photos/photo-011.jpg",
    caption: "A calm midnight toast to new days.",
    date: "2024-01-01",
    tags: ["celebration", "winter"],
  },
  {
    id: "m012",
    src: "/photos/photo-012.jpg",
    caption: "Fresh flowers and an easy spring afternoon.",
    date: "2024-03-16",
    tags: ["spring", "home"],
  },
];

export const memoryTags = Array.from(
  new Set(memories.flatMap((memory) => memory.tags)),
).sort();
