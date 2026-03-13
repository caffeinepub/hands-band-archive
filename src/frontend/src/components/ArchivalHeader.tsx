interface ArchivalHeaderProps {
  imageSrc: string;
  tint?: "pink" | "blue" | "yellow" | "none";
}

const tintStyles: Record<string, string> = {
  pink: "oklch(0.85 0.06 0 / 0.12)",
  blue: "oklch(0.55 0.08 240 / 0.14)",
  yellow: "oklch(0.90 0.10 85 / 0.10)",
  none: "transparent",
};

export default function ArchivalHeader({
  imageSrc,
  tint = "none",
}: ArchivalHeaderProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "180px", marginTop: "64px" }}
    >
      {/* Base image - grayscale + faded */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          filter: "grayscale(100%) contrast(0.65) brightness(0.5) blur(0.3px)",
          opacity: 0.8,
        }}
      />

      {/* Film grain overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: "180px 180px",
          opacity: 0.9,
          mixBlendMode: "overlay",
        }}
      />

      {/* Pastel tint */}
      {tint !== "none" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: tintStyles[tint],
            mixBlendMode: "soft-light",
          }}
        />
      )}

      {/* Scan lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, oklch(0 0 0 / 0.08) 0px, oklch(0 0 0 / 0.08) 1px, transparent 1px, transparent 3px)",
          pointerEvents: "none",
        }}
      />

      {/* Torn paper top edge */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "18px",
          background: "oklch(0.07 0.002 60)",
          clipPath:
            "polygon(0 0,3% 100%,7% 30%,12% 90%,17% 20%,22% 80%,27% 35%,33% 95%,38% 15%,43% 75%,49% 25%,54% 85%,59% 40%,65% 90%,70% 20%,75% 70%,80% 30%,86% 88%,91% 18%,96% 78%,100% 10%,100% 0)",
          zIndex: 10,
        }}
      />

      {/* Torn paper bottom edge */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "22px",
          background: "oklch(0.07 0.002 60)",
          clipPath:
            "polygon(0 100%,0 40%,4% 85%,9% 20%,14% 70%,19% 10%,25% 65%,30% 30%,36% 80%,41% 15%,47% 60%,52% 25%,58% 75%,63% 35%,69% 85%,74% 20%,80% 60%,85% 10%,91% 55%,96% 30%,100% 70%,100% 100%)",
          zIndex: 10,
        }}
      />

      {/* Side vignettes */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, oklch(0.07 0.002 60 / 0.7) 0%, transparent 30%, transparent 70%, oklch(0.07 0.002 60 / 0.7) 100%)",
          zIndex: 5,
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "60%",
          background:
            "linear-gradient(to top, oklch(0.07 0.002 60 / 0.6) 0%, transparent 100%)",
          zIndex: 6,
        }}
      />

      {/* Archival watermark label */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 16,
          zIndex: 8,
          fontFamily: "'Courier New', monospace",
          fontSize: "0.5rem",
          color: "oklch(0.55 0.005 60 / 0.5)",
          letterSpacing: "0.25em",
          userSelect: "none",
        }}
      >
        {"ARCHIVE // THEATRE COLLECTION"}
      </div>
    </div>
  );
}
