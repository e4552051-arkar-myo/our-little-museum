import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function HomePage() {
  return (
    <AppShell
      title="Welcome Home"
      subtitle="Choose a doorway into our memories."
      showHome={false}
    >
      <section className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/gallery"
          className="group rounded-3xl border border-rose-300/70 bg-white/85 p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-rose-500">Photos</p>
          <h2 className="mt-3 font-serif-display text-3xl text-rose-900">Enter Our Gallery</h2>
          <p className="mt-2 text-sm text-rose-700">Wander our timeline, open moments, and leave little hearts.</p>
        </Link>

        <Link
          href="/letters"
          className="group rounded-3xl border border-amber-300/70 bg-white/85 p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-600">Words</p>
          <h2 className="mt-3 font-serif-display text-3xl text-rose-900">Open Letter Box</h2>
          <p className="mt-2 text-sm text-rose-700">Unseal envelopes and read notes written for us.</p>
        </Link>
      </section>
    </AppShell>
  );
}
