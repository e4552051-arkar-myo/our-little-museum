"use client";

import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown"; // Dependency added for lightweight markdown rendering of letters.
import { letters } from "@/data/letters";
import { STORAGE_KEYS, readSet, writeSet } from "@/lib/progress";
import { Dialog } from "@/components/ui/Dialog";

type LetterState = {
  id: string;
};

function isDateUnlocked(date?: string | null): boolean {
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
  const [viewedPhotos, setViewedPhotos] = useState<Set<string>>(() => readSet(STORAGE_KEYS.viewedPhotos));

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
    setOpened({ id: letter.id });
  }

  function resetProgress() {
    const emptySet = new Set<string>();
    writeSet(STORAGE_KEYS.openedLetters, emptySet);
    writeSet(STORAGE_KEYS.viewedPhotos, emptySet);
    setOpenedIds(emptySet);
    setViewedPhotos(emptySet);
    setOpened(null);
  }

  const selected = opened ? visibleLetters.find((item) => item.id === opened.id) ?? null : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-rose-200/70 bg-white/80 px-4 py-3">
        <p className="text-sm text-rose-800">
          Opened letters: {openedIds.size} · Viewed photos: {viewedPhotos.size} · Surprise unlock: {surpriseUnlocked ? "Yes" : "No"}
        </p>
        <button
          type="button"
          onClick={resetProgress}
          className="rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-rose-700 transition hover:bg-rose-50"
        >
          Reset progress
        </button>
      </div>

      <section className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleLetters.map((letter) => {
          const dateLocked = !isDateUnlocked(letter.lockedUntil);
          return (
            <button
              key={letter.id}
              type="button"
              disabled={dateLocked}
              onClick={() => openLetter(letter.id)}
              className={`group relative flex h-full flex-col justify-between rounded-3xl border p-5 text-left shadow-sm transition ${
                dateLocked
                  ? "cursor-not-allowed border-rose-200 bg-rose-50/80 opacity-75"
                  : "border-rose-300/70 bg-white/85 hover:-translate-y-0.5 hover:shadow-md"
              }`}
            >
              <div className="absolute right-4 top-3 text-xl">✉️</div>
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-2 pr-10">
                  <p className="font-serif-display text-2xl text-rose-900">{letter.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-600">{formatDate(letter.date)}</p>
                  <p className="line-clamp-2 text-sm text-rose-800">{letter.preview}</p>
                </div>

                <div className="mt-4">
                  {dateLocked ? (
                    <p className="text-xs font-semibold text-rose-600">Locked until {formatDate(letter.lockedUntil!)}</p>
                  ) : (
                    <p className="text-xs font-semibold text-rose-500 group-hover:tracking-wide">Tap to open</p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </section>

      <Dialog open={!!selected} onClose={() => setOpened(null)} title={selected?.title ?? "Letter"}>
        {selected ? (
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-rose-600">{formatDate(selected.date)}</p>
            <div className="letter-markdown max-w-none">
              <ReactMarkdown>{selected.markdown}</ReactMarkdown>
            </div>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
}
