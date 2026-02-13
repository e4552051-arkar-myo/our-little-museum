"use client";

import { FormEvent, useState } from "react";
import { PASSCODE, PASSCODE_HINT, setUnlocked } from "@/lib/passcode";

type PasscodeGateProps = {
  onUnlocked: () => void;
  hint?: string;
};

export function PasscodeGate({ onUnlocked, hint = PASSCODE_HINT }: PasscodeGateProps) {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.trim() !== PASSCODE) {
      setError("That passcode is not correct yet.");
      setSuccess(false);
      return;
    }

    setError("");
    setUnlocked();
    setSuccess(true);

    window.setTimeout(() => {
      onUnlocked();
    }, 420);
  }

  return (
    <section className="mx-auto max-w-md rounded-3xl border border-rose-200/80 bg-white/90 p-6 text-center shadow-sm sm:p-8">
      <p className={`mx-auto mb-3 inline-block text-2xl ${success ? "animate-heart-pulse" : ""}`} aria-hidden="true">
        💗
      </p>
      <h2 className="font-serif-display text-3xl text-rose-900">Our Little Museum 💗</h2>
      <p className="mt-2 text-sm text-rose-700">Enter the passcode</p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-left">
        <label htmlFor="museum-passcode" className="block text-xs font-semibold uppercase tracking-[0.18em] text-rose-600">
          Passcode
        </label>
        <div className="flex gap-2">
          <input
            id="museum-passcode"
            type={showCode ? "text" : "password"}
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError("");
            }}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            inputMode="numeric"
            className="w-full rounded-2xl border border-rose-200 bg-rose-50/50 px-4 py-3 text-rose-900 outline-none transition focus:border-rose-400"
            placeholder="Enter passcode"
            required
          />
          <button
            type="button"
            onClick={() => setShowCode((prev) => !prev)}
            className="rounded-2xl border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
          >
            {showCode ? "Hide" : "Show"}
          </button>
        </div>

        {error ? <p className="text-xs font-semibold text-rose-600">{error}</p> : null}
        {success ? <p className="text-xs font-semibold text-emerald-600">Unlocked. Welcome in.</p> : null}

        <button
          type="submit"
          className="w-full rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
        >
          Unlock
        </button>
      </form>

      {hint ? <p className="mt-4 text-xs text-rose-600/80">{hint}</p> : null}
    </section>
  );
}
