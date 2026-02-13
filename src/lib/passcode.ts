export const PASSCODE = "2719";
export const STORAGE_KEY = "olm_passcode_unlocked";
export const PASSCODE_HINT = "Hint: a meaningful 4-digit date.";

export function isUnlocked(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function setUnlocked(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, "true");
}

export function clearUnlocked(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
