"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  panelClassName?: string;
  contentClassName?: string;
  contentScrollable?: boolean;
};

export function Dialog({
  open,
  onClose,
  title,
  children,
  panelClassName,
  contentClassName,
  contentScrollable = true,
}: DialogProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const previous = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
      touchAction: bodyStyle.touchAction,
    };

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";

    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", keyHandler);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", keyHandler);
      bodyStyle.position = previous.position;
      bodyStyle.top = previous.top;
      bodyStyle.width = previous.width;
      bodyStyle.overflow = previous.overflow;
      bodyStyle.touchAction = previous.touchAction;
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-rose-950/45 px-3 py-4 backdrop-blur-[2px] sm:items-center"
      onClick={onClose}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={`dialog-heart-${index}`}
            className="dialog-float-heart"
            style={
              {
                left: `${8 + index * 16}%`,
                animationDelay: `${(index % 3) * 0.6}s`,
                animationDuration: `${4.8 + (index % 2) * 0.7}s`,
              } as CSSProperties
            }
          >
            ❤
          </span>
        ))}
      </div>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`dialog-panel overscroll-contain-modal relative w-full max-w-2xl rounded-3xl border border-rose-200/75 bg-[#fff8f4] p-5 text-rose-900 shadow-[0_24px_90px_rgba(118,41,69,0.28)] sm:p-7 ${panelClassName ?? ""}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-rose-200 bg-white/85 text-lg text-rose-700 transition hover:bg-white"
          aria-label="Close dialog"
        >
          ✕
        </button>

        <h2 className="pr-10 font-serif-display text-3xl text-rose-900">{title}</h2>
        <div
          className={`${contentScrollable ? "mt-4 max-h-[75vh] overflow-y-auto pr-1 ios-touch-scroll" : "mt-4 min-h-0"} ${contentClassName ?? ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
