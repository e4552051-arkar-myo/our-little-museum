import Link from "next/link";
import { LockButton } from "@/components/LockButton";

type AppShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  showHome?: boolean;
};

export function AppShell({ title, subtitle, children, showHome = true }: AppShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 pb-16 pt-24 sm:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#ffe8ef_0%,_#fff6ef_40%,_#fffaf5_72%)]" />
      <div className="pointer-events-none absolute -left-12 top-16 -z-10 h-48 w-48 rounded-full bg-rose-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-20 -z-10 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />

      <main className="page-fade-in mx-auto w-full max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-2">
          {showHome ? (
            <Link
              href="/home"
              className="inline-flex rounded-full border border-rose-300/70 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-800 transition hover:bg-white"
            >
              ← Back Home
            </Link>
          ) : (
            <span />
          )}
          <LockButton />
        </div>

        <header className="mb-6 text-center sm:mb-10">
          <h1 className="font-serif-display text-4xl tracking-tight text-rose-900 sm:text-5xl">{title}</h1>
          {subtitle ? <p className="mx-auto mt-2 max-w-2xl text-sm text-rose-800/85 sm:text-base">{subtitle}</p> : null}
        </header>

        {children}
      </main>
    </div>
  );
}
