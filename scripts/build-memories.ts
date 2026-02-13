import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import exifr from "exifr"; // Lightweight EXIF reader for local photo metadata extraction.
import { imageSize } from "image-size";

type ExistingMemory = {
  id?: string;
  date?: string;
  title?: string;
  caption?: string;
  location?: string | null;
  imageUrl?: string;
  src?: string;
  tags?: string[];
  aspect?: "portrait" | "landscape" | "square";
};

type GeneratedMemory = {
  id: string;
  date: string;
  title: string;
  caption: string;
  location: string | null;
  imageUrl: string;
  tags: string[];
  aspect: "portrait" | "landscape" | "square";
};

const ROOT = process.cwd();
const PHOTOS_DIR = path.join(ROOT, "public", "photos");
const OUTPUT_FILE = path.join(ROOT, "src", "data", "memories.ts");
const EXISTING_FILE = path.join(ROOT, "src", "data", "memories.ts");

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"]);
const TAGS = [
  "us",
  "date-night",
  "travel",
  "cozy",
  "fun",
  "celebration",
  "everyday",
  "sunset",
  "food",
  "friends",
  "nature",
] as const;

function isImageFile(fileName: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || "memory";
}

function formatDate(input: Date): string {
  const year = input.getFullYear();
  const month = String(input.getMonth() + 1).padStart(2, "0");
  const day = String(input.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function pickDate(metadata: Record<string, unknown> | null, fallback: Date): Date {
  const keys = ["DateTimeOriginal", "dateTimeOriginal", "CreateDate", "createDate", "ModifyDate", "modifyDate"];

  for (const key of keys) {
    const value = metadata?.[key];
    if (value instanceof Date && !Number.isNaN(value.valueOf())) {
      return value;
    }

    if (typeof value === "string") {
      const parsed = new Date(value.replace(/:/g, "-").replace(" ", "T"));
      if (!Number.isNaN(parsed.valueOf())) {
        return parsed;
      }
    }
  }

  return fallback;
}

function pickNumeric(metadata: Record<string, unknown> | null, keys: string[]): number | null {
  for (const key of keys) {
    const value = metadata?.[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }

  return null;
}

function determineAspect(width: number | null, height: number | null): "portrait" | "landscape" | "square" {
  if (!width || !height) {
    return "landscape";
  }

  if (width === height) {
    return "square";
  }

  return width > height ? "landscape" : "portrait";
}

function pickTitle(seed: string, aspect: "portrait" | "landscape" | "square", date: Date): string {
  const month = date.getMonth();
  const hour = date.getHours();

  if (hour >= 17 && hour <= 19) {
    return "Sunset memory";
  }

  if (aspect === "portrait") {
    return "Little museum moment";
  }

  if (aspect === "square") {
    return "A sweet snapshot";
  }

  if (month >= 5 && month <= 8) {
    return "A day to remember";
  }

  const options = ["Warm little memory", "A cozy chapter", "A gentle memory"];
  const index = seed.length % options.length;
  return options[index];
}

function pickCaption(aspect: "portrait" | "landscape" | "square", date: Date): string {
  if (aspect === "portrait") {
    return "A quiet moment we can always come back to.";
  }

  if (aspect === "square") {
    return "A tiny frame filled with warmth and smiles.";
  }

  if (date.getHours() >= 17 && date.getHours() <= 19) {
    return "Soft evening light and a memory worth keeping.";
  }

  return "One more sweet memory for our little museum.";
}

function pickTags(aspect: "portrait" | "landscape" | "square", date: Date): string[] {
  const tagSet = new Set<string>(["us", "everyday"]);
  const month = date.getMonth();
  const hour = date.getHours();

  if (aspect === "landscape") {
    tagSet.add("nature");
  }

  if (aspect === "portrait") {
    tagSet.add("cozy");
  }

  if (aspect === "square") {
    tagSet.add("fun");
  }

  if (month === 11 || month === 0 || month === 1) {
    tagSet.add("celebration");
  }

  if (month >= 5 && month <= 8) {
    tagSet.add("travel");
  }

  if (hour >= 17 && hour <= 19) {
    tagSet.add("sunset");
  }

  return Array.from(tagSet).filter((tag): tag is (typeof TAGS)[number] => TAGS.includes(tag as (typeof TAGS)[number]));
}

function formatLocation(latitude: number | null, longitude: number | null): string | null {
  if (latitude == null || longitude == null) {
    return null;
  }

  return `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
}

async function loadExistingMemories(): Promise<Map<string, ExistingMemory>> {
  const existingMap = new Map<string, ExistingMemory>();

  try {
    const moduleUrl = `${pathToFileURL(EXISTING_FILE).href}?t=${Date.now()}`;
    const existingModule = (await import(moduleUrl)) as { memories?: ExistingMemory[] };
    const items = Array.isArray(existingModule.memories) ? existingModule.memories : [];

    for (const item of items) {
      const imageUrl = item.imageUrl ?? item.src;
      if (imageUrl) {
        existingMap.set(imageUrl.toLowerCase(), item);
        existingMap.set(path.basename(imageUrl).toLowerCase(), item);
      }
    }
  } catch {
    // No existing memories to merge.
  }

  return existingMap;
}

async function getDimensions(filePath: string, metadata: Record<string, unknown> | null): Promise<{ width: number | null; height: number | null }> {
  let width = pickNumeric(metadata, ["width", "ImageWidth", "ExifImageWidth", "PixelXDimension"]);
  let height = pickNumeric(metadata, ["height", "ImageHeight", "ExifImageHeight", "PixelYDimension"]);

  if (width && height) {
    return { width, height };
  }

  try {
    const buffer = await fs.readFile(filePath);
    const dimensions = imageSize(buffer);
    width = dimensions.width ?? width;
    height = dimensions.height ?? height;
  } catch {
    // Keep EXIF fallback values if direct size detection fails.
  }

  return { width, height };
}

async function build(): Promise<void> {
  const existingMap = await loadExistingMemories();
  const entries = await fs.readdir(PHOTOS_DIR, { withFileTypes: true });

  const photos = entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const generated: GeneratedMemory[] = [];

  for (const fileName of photos) {
    const filePath = path.join(PHOTOS_DIR, fileName);
    const imageUrl = `/photos/${fileName}`;
    const fileStats = await fs.stat(filePath);

    const metadata = (await exifr.parse(filePath).catch(() => null)) as Record<string, unknown> | null;

    const { width, height } = await getDimensions(filePath, metadata);
    const aspect = determineAspect(width, height);
    const dateValue = pickDate(metadata, fileStats.mtime);
    const date = formatDate(dateValue);

    const latitude = pickNumeric(metadata, ["latitude", "Latitude", "GPSLatitude"]);
    const longitude = pickNumeric(metadata, ["longitude", "Longitude", "GPSLongitude"]);
    const location = formatLocation(latitude, longitude);

    const baseName = fileName.replace(/\.[^.]+$/, "").toLowerCase();
    const existing = existingMap.get(imageUrl.toLowerCase()) ?? existingMap.get(fileName.toLowerCase());

    const title = existing?.title?.trim() ? existing.title : pickTitle(baseName, aspect, dateValue);
    const caption = existing?.caption?.trim() ? existing.caption : pickCaption(aspect, dateValue);

    generated.push({
      id: slugify(baseName),
      date,
      title,
      caption,
      location,
      imageUrl,
      tags: pickTags(aspect, dateValue),
      aspect,
    });
  }

  generated.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) {
      return dateCompare;
    }

    return a.imageUrl.localeCompare(b.imageUrl);
  });

  const output = `export type Memory = {\n  id: string;\n  date: string;\n  title: string;\n  caption: string;\n  location: string | null;\n  imageUrl: string;\n  tags: string[];\n  aspect: "portrait" | "landscape" | "square";\n};\n\nexport const memories: Memory[] = ${JSON.stringify(generated, null, 2)};\n\nexport const memoryTags = Array.from(\n  new Set(memories.flatMap((memory) => memory.tags)),\n).sort();\n`;

  await fs.writeFile(OUTPUT_FILE, output, "utf8");
  console.log(`Generated ${generated.length} memories from local images in public/photos.`);
}

build().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
