"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEYS, readBoolean, writeBoolean } from "@/lib/progress";

const MUSIC_SOURCES = [
  "/music/river-flows-in-you.mp3",
  "/music/love-theme.mp3",
  "/music/song.mp3",
  "/musics/song.mp3",
] as const;

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" ? readBoolean(STORAGE_KEYS.musicOn, false) : false,
  );
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function findFirstAvailableSource() {
      for (let index = 0; index < MUSIC_SOURCES.length; index += 1) {
        try {
          const response = await fetch(MUSIC_SOURCES[index], { method: "HEAD", cache: "no-store" });
          if (response.ok) {
            if (!cancelled) {
              setSourceIndex(index);
              setAvailable(true);
            }
            return;
          }
        } catch {
          // Continue trying the next local source.
        }
      }

      if (!cancelled) {
        setAvailable(false);
        setEnabled(false);
      }
    }

    void findFirstAvailableSource();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!available) {
      return;
    }

    writeBoolean(STORAGE_KEYS.musicOn, enabled);

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (!enabled) {
      audio.pause();
      return;
    }

    void audio.play().catch(() => {
      setEnabled(false);
    });
  }, [available, enabled, sourceIndex]);

  const label = useMemo(() => {
    if (!available) {
      return "Music unavailable";
    }

    return enabled ? "Music on" : "Music off";
  }, [available, enabled]);

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SOURCES[sourceIndex]}
        loop
        onError={() => {
          if (sourceIndex < MUSIC_SOURCES.length - 1) {
            setSourceIndex((prev) => prev + 1);
            return;
          }
          setAvailable(false);
          setEnabled(false);
        }}
      />
      <button
        type="button"
        disabled={!available}
        onClick={() => setEnabled((prev) => !prev)}
        className="fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-50 rounded-full border border-white/60 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-rose-700 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        aria-label="Toggle background music"
      >
        {label} ♪
      </button>
    </>
  );
}
