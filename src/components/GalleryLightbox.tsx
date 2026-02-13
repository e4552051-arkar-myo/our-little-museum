"use client";

import { useEffect } from "react";
import { Dialog } from "@/components/ui/Dialog";
import type { Memory } from "@/data/memories";

type GalleryLightboxProps = {
  memory: Memory | null;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  showDownload?: boolean;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function GalleryLightbox({
  memory,
  open,
  onClose,
  onPrev,
  onNext,
  showDownload = false,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [onNext, onPrev, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={memory?.title ?? "Photo"}
      panelClassName="max-w-[min(96vw,1120px)] h-[82vh] max-h-[82vh] flex flex-col p-4 sm:p-5"
      contentScrollable={false}
      contentClassName="mt-3 flex-1 min-h-0"
    >
      {memory ? (
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-rose-100/70 bg-white/55">
          <div
            className="lightbox-image-viewport flex-1 overflow-hidden rounded-t-2xl bg-rose-50/40"
            onTouchMove={(event) => event.preventDefault()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={memory.imageUrl}
              alt={memory.title}
              className="mx-auto max-h-[78vh] w-auto max-w-[96vw] select-none object-contain"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>

          <div className="lightbox-meta-panel ios-touch-scroll shrink-0 border-t border-rose-200/70 bg-white/85 px-4 py-3 backdrop-blur-sm sm:px-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-rose-900">{memory.caption}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-rose-600">{formatDate(memory.date)}</p>
                {memory.location ? <p className="text-xs text-rose-600">{memory.location}</p> : null}
              </div>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={onPrev}
                  className="rounded-full bg-rose-100 px-4 py-2 text-sm text-rose-900 transition hover:bg-rose-200"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  className="rounded-full bg-rose-100 px-4 py-2 text-sm text-rose-900 transition hover:bg-rose-200"
                >
                  Next
                </button>
                {showDownload ? (
                  <a
                    href={memory.imageUrl}
                    download
                    className="rounded-full bg-rose-500 px-4 py-2 text-sm text-white transition hover:bg-rose-600"
                  >
                    Download
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}
