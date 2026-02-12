"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { memories, memoryTags } from "@/data/memories";
import { STORAGE_KEYS, readSet, writeSet } from "@/lib/progress";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function GalleryClient() {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [likedIds, setLikedIds] = useState<Set<string>>(() => readSet(STORAGE_KEYS.likedPhotos));

  const filtered = useMemo(() => {
    const sorted = [...memories].sort((a, b) => a.date.localeCompare(b.date));
    if (activeTag === "all") {
      return sorted;
    }

    return sorted.filter((item) => item.tags.includes(activeTag));
  }, [activeTag]);

  const selectedIndex = filtered.findIndex((item) => item.id === selectedId);
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  function toggleLike(id: string) {
    const next = new Set(likedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }

    setLikedIds(next);
    writeSet(STORAGE_KEYS.likedPhotos, next);
  }

  function markViewed(id: string) {
    const viewed = readSet(STORAGE_KEYS.viewedPhotos);
    viewed.add(id);
    writeSet(STORAGE_KEYS.viewedPhotos, viewed);
  }

  function openLightbox(id: string) {
    setSelectedId(id);
    markViewed(id);
  }

  function step(direction: "prev" | "next") {
    if (!selected) {
      return;
    }

    const increment = direction === "next" ? 1 : -1;
    const nextIndex = (selectedIndex + increment + filtered.length) % filtered.length;
    const nextId = filtered[nextIndex]?.id;
    if (!nextId) {
      return;
    }

    setSelectedId(nextId);
    markViewed(nextId);
  }

  return (
    <div className="space-y-6">
      <section className="overflow-x-auto rounded-3xl border border-rose-200/60 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">Timeline</h2>
        <ol className="flex min-w-max items-center gap-3 pb-1">
          {filtered.map((memory, index) => (
            <li key={`${memory.id}-dot`} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openLightbox(memory.id)}
                className="rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-700 transition hover:bg-rose-200"
              >
                {new Date(`${memory.date}T00:00:00`).getFullYear()}
              </button>
              {index < filtered.length - 1 ? <span className="h-px w-8 bg-rose-300/70" /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-rose-200/60 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-rose-600">Album Tags</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              activeTag === "all" ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-700 hover:bg-rose-200"
            }`}
          >
            all
          </button>
          {memoryTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full px-3 py-1.5 text-sm transition ${
                activeTag === tag ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-700 hover:bg-rose-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((memory) => {
          const liked = likedIds.has(memory.id);
          return (
            <article
              key={memory.id}
              className="group rounded-3xl border border-rose-200/70 bg-white/85 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <button
                type="button"
                onClick={() => openLightbox(memory.id)}
                className="relative block h-56 w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={memory.src}
                  alt={memory.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </button>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-rose-800">{memory.caption}</p>
                  <p className="mt-1 text-xs text-rose-600/80">{formatDate(memory.date)}</p>
                  {memory.location ? <p className="text-xs text-rose-500">{memory.location}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => toggleLike(memory.id)}
                  className={`shrink-0 rounded-full px-2 py-1 text-xs ${
                    liked ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-700"
                  }`}
                >
                  💗 react
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {selected ? (
        <div
          className="fixed inset-0 z-40 flex items-end justify-center bg-rose-950/55 p-3 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl rounded-3xl bg-[#fff8f4] p-4 shadow-2xl sm:p-6">
            <div className="relative h-[52vh] min-h-[320px] overflow-hidden rounded-2xl">
              <Image
                src={selected.src}
                alt={selected.caption}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base text-rose-900">{selected.caption}</p>
                <p className="text-sm text-rose-700">{formatDate(selected.date)}</p>
                {selected.location ? <p className="text-sm text-rose-600">{selected.location}</p> : null}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => step("prev")}
                  className="rounded-full bg-rose-100 px-4 py-2 text-sm text-rose-800"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() => step("next")}
                  className="rounded-full bg-rose-100 px-4 py-2 text-sm text-rose-800"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
