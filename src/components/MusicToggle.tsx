"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { STORAGE_KEYS, readBoolean, writeBoolean } from "@/lib/progress";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [enabled, setEnabled] = useState(() =>
    typeof window !== "undefined" ? readBoolean(STORAGE_KEYS.musicOn, false) : false,
  );
  const [available, setAvailable] = useState(true);

  useEffect(() => {
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
  }, [enabled]);

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
        src="/music/love-theme.mp3"
        loop
        onError={() => {
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
