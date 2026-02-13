"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { clearUnlocked, isUnlocked } from "@/lib/passcode";

export function LockButton() {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(() => isUnlocked());

  if (!unlocked) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => {
        clearUnlocked();
        setUnlocked(false);
        router.push("/home");
      }}
      className="inline-flex rounded-full border border-rose-300/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 transition hover:bg-white"
    >
      Lock
    </button>
  );
}
