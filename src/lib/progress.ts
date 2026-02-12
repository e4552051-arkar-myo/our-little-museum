export const STORAGE_KEYS = {
  unwrapped: "olm_unwrapped",
  likedPhotos: "olm_liked_photos",
  viewedPhotos: "olm_viewed_photos",
  openedLetters: "olm_opened_letters",
  musicOn: "olm_music_on",
} as const;

function parseStoredSet(raw: string | null): Set<string> {
  if (!raw) {
    return new Set();
  }

  try {
    const values = JSON.parse(raw) as unknown;
    if (!Array.isArray(values)) {
      return new Set();
    }

    return new Set(values.filter((item): item is string => typeof item === "string"));
  } catch {
    return new Set();
  }
}

export function readSet(key: string): Set<string> {
  if (typeof window === "undefined") {
    return new Set();
  }

  return parseStoredSet(window.localStorage.getItem(key));
}

export function writeSet(key: string, values: Set<string>): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(Array.from(values)));
}

export function readBoolean(key: string, fallback = false): boolean {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = window.localStorage.getItem(key);
  if (value == null) {
    return fallback;
  }

  return value === "true";
}

export function writeBoolean(key: string, value: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, String(value));
}
