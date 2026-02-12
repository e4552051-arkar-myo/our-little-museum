"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS, readBoolean, writeBoolean } from "@/lib/progress";

export default function GiftWrapPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [unwrapping, setUnwrapping] = useState(false);

  useEffect(() => {
    const unwrapped = readBoolean(STORAGE_KEYS.unwrapped, false);
    if (unwrapped) {
      router.replace("/home");
      return;
    }

    setReady(true);
  }, [router]);

  function unwrap() {
    setUnwrapping(true);

    window.setTimeout(() => {
      writeBoolean(STORAGE_KEYS.unwrapped, true);
      router.replace("/home");
    }, 900);
  }

  if (!ready) {
    return <main className="min-h-screen bg-[#fff7f4]" />;
  }

  return (
    <main className="grid min-h-screen place-items-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#ffe0e8_0%,_#fff4ef_44%,_#fffaf6_75%)]" />
      <section className="text-center">
        <div className={`gift-box mx-auto mb-8 ${unwrapping ? "animate-unwrapping" : ""}`} aria-hidden="true">
          <div className="gift-lid" />
          <div className="gift-ribbon-vertical" />
          <div className="gift-ribbon-horizontal" />
          <div className="gift-heart">💝</div>
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
