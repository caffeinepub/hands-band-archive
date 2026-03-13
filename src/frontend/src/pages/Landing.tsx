import { useNavigate } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isEntering, setIsEntering] = useState(false);

  const handleHandprintClick = useCallback(() => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 1500);
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      navigate({ to: "/secret" });
      return;
    }
    setIsEntering(true);
    setTimeout(() => navigate({ to: "/home" }), 350);
  }, [navigate]);

  const handleEnterClick = useCallback(() => {
    setIsEntering(true);
    setTimeout(() => navigate({ to: "/home" }), 350);
  }, [navigate]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{
        background: "#080808",
        transition: isEntering ? "opacity 0.35s ease-out" : undefined,
        opacity: isEntering ? 0 : 1,
      }}
    >
      {/* Film grain */}
      <div className="grain-overlay" />
      <div className="scan-lines" />

      {/* Handprint */}
      <button
        type="button"
        className="flex flex-col items-center gap-8 group cursor-crosshair border-0 bg-transparent p-0"
        onClick={handleHandprintClick}
        aria-label="Enter archive"
      >
        <div
          className="flicker relative"
          style={{ filter: "grayscale(100%) contrast(1.25) brightness(0.95)" }}
        >
          <img
            src="/assets/generated/handprint-evidence.dim_600x700.jpg"
            alt="Evidence — handprint"
            className="w-48 sm:w-64 md:w-72 object-contain"
            style={{ maxHeight: "55vh", objectFit: "contain" }}
          />
          {/* Corner evidence label */}
          <div
            className="absolute bottom-2 right-2 text-xs font-mono tracking-widest"
            style={{
              color: "oklch(0.35 0.005 60)",
              fontSize: "0.5rem",
              letterSpacing: "0.2em",
            }}
          >
            EXHIBIT A / FILE #0001
          </div>
        </div>

        {/* Enter text */}
        <div className="text-center">
          <p
            className="text-xs tracking-widest font-mono cursor-blink"
            style={{
              color: "oklch(0.50 0.005 60)",
              letterSpacing: "0.5em",
              fontSize: "0.65rem",
            }}
          >
            ENTER HERE
          </p>
        </div>
      </button>

      {/* Separate enter button for accessibility */}
      <button
        type="button"
        data-ocid="landing.primary_button"
        onClick={handleEnterClick}
        className="absolute bottom-12 text-xs font-mono tracking-widest border-0 bg-transparent"
        style={{
          color: "oklch(0.30 0.004 60)",
          letterSpacing: "0.3em",
          fontSize: "0.6rem",
          cursor: "crosshair",
        }}
      >
        [ ENTER THE ARCHIVE ]
      </button>

      {/* Small text bottom */}
      <div
        className="absolute bottom-4 left-0 right-0 text-center font-mono"
        style={{
          color: "oklch(0.22 0.003 60)",
          fontSize: "0.5rem",
          letterSpacing: "0.15em",
        }}
      >
        HANDS — EVIDENCE ARCHIVE — ONGOING INVESTIGATION — EST. 2018
      </div>
    </div>
  );
}
