export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_top,_#ffe7ef_0%,_#fff6ef_42%,_#fffaf6_74%)] px-6">
      <div className="rounded-3xl border border-rose-200/70 bg-white/85 px-8 py-6 text-center shadow-sm backdrop-blur-sm">
        <p className="text-3xl animate-heart-pulse" aria-hidden="true">
          ❤
        </p>
        <p className="mt-2 text-sm font-semibold tracking-wide text-rose-700">Gathering your sweetest moments...</p>
      </div>
    </main>
  );
}
