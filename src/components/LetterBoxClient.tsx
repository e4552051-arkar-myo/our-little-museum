"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown"; // Dependency added for lightweight markdown rendering of letters.
import { letters } from "@/data/letters";
import { STORAGE_KEYS, readSet, writeSet } from "@/lib/progress";

type LetterState = {
  id: string;
  openedAt: number;
};

function isDateUnlocked(date?: string): boolean {
  if (!date) {
    return true;
  }

  const now = new Date();
  const unlockAt = new Date(`${date}T00:00:00`);
  return now >= unlockAt;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function LetterBoxClient() {
  const [opened, setOpened] = useState<LetterState | null>(null);
  const [openedIds, setOpenedIds] = useState<Set<string>>(() => readSet(STORAGE_KEYS.openedLetters));
  const viewedPhotos = readSet(STORAGE_KEYS.viewedPhotos);

  const surpriseUnlocked = openedIds.size >= 5 || viewedPhotos.size >= 20;

  const visibleLetters = useMemo(
    () => letters.filter((letter) => !letter.surprise || surpriseUnlocked),
    [surpriseUnlocked],
  );

  function openLetter(id: string) {
    const letter = visibleLetters.find((item) => item.id === id);
    if (!letter || !isDateUnlocked(letter.lockedUntil)) {
      return;
    }

    const nextOpened = new Set(openedIds);
    nextOpened.add(letter.id);
    writeSet(STORAGE_KEYS.openedLetters, nextOpened);
    setOpenedIds(nextOpened);
    setOpened({ id: letter.id, openedAt: Date.now() });
  }

  const selected = opened ? visibleLetters.find((item) => item.id === opened.id) ?? null : null;

  return (
    <div className="space-y-6">
      <p className="rounded-2xl border border-rose-200/70 bg-white/80 px-4 py-3 text-sm text-rose-800">
        Opened letters: {openedIds.size} · Viewed photos: {viewedPhotos.size} · Surprise unlock: {surpriseUnlocked ? "Yes" : "No"}
      </p>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleLetters.map((letter) => {
          const dateLocked = !isDateUnlocked(letter.lockedUntil);
          return (
            <button
              key={letter.id}
              type="button"
              disabled={dateLocked}
              onClick={() => openLetter(letter.id)}
              className={`group relative rounded-3xl border p-5 text-left shadow-sm transition ${
                dateLocked
                  ? "cursor-not-allowed border-rose-200 bg-rose-50/80 opacity-75"
                  : "border-rose-300/70 bg-white/85 hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div className="absolute right-4 top-3 text-xl">✉️</div>
              <p className="font-serif-display text-2xl text-rose-900">{letter.title}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-rose-600">{formatDate(letter.date)}</p>
              <p className="mt-2 text-sm text-rose-800">{letter.preview}</p>
              {dateLocked ? (
                <p className="mt-3 text-xs font-semibold text-rose-600">Locked until {formatDate(letter.lockedUntil!)}</p>
              ) : (
                <p className="mt-3 text-xs font-semibold text-rose-500 group-hover:tracking-wide">Tap to open</p>
              )}
            </button>
          );
        })}
      </section>

      {selected ? (
        <section
          key={opened?.openedAt}
          className="animate-envelope-open rounded-3xl border border-rose-200/80 bg-white/90 p-5 shadow-md sm:p-7"
        >
          <div className="letter-markdown max-w-none">
            <ReactMarkdown>{selected.markdown}</ReactMarkdown>
          </div>
        </section>
      ) : (
        <section className="rounded-3xl border border-dashed border-rose-300 bg-white/55 p-8 text-center text-sm text-rose-700">
          Pick an envelope to read a letter.
        </section>
      )}
    </div>
  );
}
