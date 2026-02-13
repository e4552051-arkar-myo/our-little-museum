"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { memories, memoryTags } from "@/data/memories";
import { STORAGE_KEYS, readSet, writeSet } from "@/lib/progress";
import { GalleryLightbox } from "@/components/GalleryLightbox";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function formatTimelineDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
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

  const closeLightbox = useCallback(() => {
    setSelectedId(null);
  }, []);

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

  const step = useCallback(
    (direction: "prev" | "next") => {
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
    },
    [filtered, selected, selectedIndex],
  );

  const prevPhoto = useCallback(() => step("prev"), [step]);
  const nextPhoto = useCallback(() => step("next"), [step]);

  return (
    <div className="space-y-6 page-fade-in">
      <section className="no-scrollbar overflow-x-auto rounded-3xl border border-rose-200/60 bg-white/85 p-4 shadow-sm backdrop-blur sm:p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Timeline</h2>
        <ol className="flex min-w-max items-center gap-3 pb-1">
          {filtered.map((memory, index) => (
            <li key={`${memory.id}-dot`} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openLightbox(memory.id)}
                className="rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-800 transition hover:bg-rose-200"
                aria-label={`View ${memory.caption}`}
              >
                {formatTimelineDate(memory.date)}
              </button>
              {index < filtered.length - 1 ? <span className="h-px w-8 bg-rose-300/70" /> : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl border border-rose-200/60 bg-white/85 p-4 shadow-sm backdrop-blur sm:p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-rose-700">Album Tags</h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`rounded-full px-3 py-1.5 text-sm transition ${
              activeTag === "all" ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-800 hover:bg-rose-200"
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
                activeTag === tag ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-800 hover:bg-rose-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((memory) => {
          const liked = likedIds.has(memory.id);
          return (
            <article
              key={memory.id}
              className="group h-full overflow-hidden rounded-3xl border border-rose-200/80 bg-white/90 shadow-sm transition-all duration-300 will-change-transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-[0.995] active:shadow-sm"
            >
              <button
                type="button"
                onClick={() => openLightbox(memory.id)}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-t-3xl active:scale-[0.998]"
                aria-label={`Open photo: ${memory.title}`}
              >
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-rose-950/25 via-rose-900/10 to-transparent" />
              </button>
              <div className="flex h-full flex-1 flex-col px-5 pb-5 pt-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="line-clamp-2 min-w-0 text-sm font-semibold text-rose-900">{memory.title}</p>
                  <button
                    type="button"
                    onClick={() => toggleLike(memory.id)}
                    className={`shrink-0 rounded-full px-2 py-1 text-xs ${
                      liked ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-800"
                    }`}
                    aria-pressed={liked}
                  >
                    💗 react
                  </button>
                </div>

                <p className="mt-2 line-clamp-3 text-sm text-rose-900">{memory.caption}</p>

                <div className="mt-auto pt-3">
                  <p className="text-xs text-rose-700/90">{formatDate(memory.date)}</p>
                  {memory.location ? <p className="line-clamp-2 text-xs text-rose-600">{memory.location}</p> : null}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <GalleryLightbox
        memory={selected}
        open={!!selected}
        onClose={closeLightbox}
        onPrev={prevPhoto}
        onNext={nextPhoto}
      />
    </div>
  );
}
