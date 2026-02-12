"use client";

import { type CSSProperties, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS, readBoolean, writeBoolean } from "@/lib/progress";

export default function GiftWrapPage() {
  const router = useRouter();
  const [unwrapping, setUnwrapping] = useState(false);

  useEffect(() => {
    const unwrapped = readBoolean(STORAGE_KEYS.unwrapped, false);
    if (unwrapped) {
      router.replace("/home");
    }
  }, [router]);

  function unwrap() {
    setUnwrapping(true);

    window.setTimeout(() => {
      writeBoolean(STORAGE_KEYS.unwrapped, true);
      router.replace("/home");
    }, 1200);
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#ffe0e8_0%,_#fff4ef_44%,_#fffaf6_75%)]" />
      <section className="text-center">
        <div className="relative mx-auto mb-8 w-fit">
          {unwrapping ? (
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  // Deterministic spread keeps render stable and lightweight.
                  key={`heart-${index}`}
                  className="unwrap-heart"
                  style={
                    {
                      left: `${8 + index * 7.2}%`,
                      animationDelay: `${(index % 4) * 0.12}s`,
                      animationDuration: `${1.3 + (index % 3) * 0.2}s`,
                    } as CSSProperties
                  }
                >
                  ❤
                </span>
              ))}
            </div>
          ) : null}
          <div className={`gift-box ${unwrapping ? "animate-unwrapping" : ""}`} aria-hidden="true">
          <div className="gift-lid" />
          <div className="gift-ribbon-vertical" />
          <div className="gift-ribbon-horizontal" />
          <div className="gift-heart">💝</div>
        </div>
        </div>
        <h1 className="font-serif-display text-4xl text-rose-900 sm:text-5xl">Our Little Museum</h1>
        <p className="mx-auto mt-3 max-w-sm text-sm text-rose-700 sm:text-base">
          A tiny place where our sweetest days stay close forever.
        </p>
        <button
          type="button"
          onClick={unwrap}
          disabled={unwrapping}
          className="mt-6 rounded-full bg-rose-500 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-rose-300/60 transition hover:scale-[1.02] hover:bg-rose-600 disabled:cursor-wait disabled:opacity-85"
        >
          Unwrap 💝
        </button>
      </section>
    </main>
  );
}
