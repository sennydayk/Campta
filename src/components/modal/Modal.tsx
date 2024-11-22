"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface ModalProps {
  children: React.ReactNode;
  detailPageUrl?: string;
}

export default function Modal({ children, detailPageUrl }: ModalProps) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlay.current) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  const onWrapperClick = useCallback(() => {
    if (
      detailPageUrl &&
      typeof detailPageUrl === "string" &&
      detailPageUrl.startsWith("/")
    ) {
      router.push(detailPageUrl);
    } else {
      console.warn("Invalid detailPageUrl provided to Modal component");
    }
  }, [router, detailPageUrl]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);

  return (
    <div className="fixed inset-0 z-50">
      <div
        ref={overlay}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onOverlayClick}
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <div
            ref={wrapper}
            className={`bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto ${
              detailPageUrl ? "cursor-pointer" : ""
            }`}
            data-scroll-container
            onClick={detailPageUrl ? onWrapperClick : undefined}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
