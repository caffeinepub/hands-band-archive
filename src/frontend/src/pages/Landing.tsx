import { useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";

const NAV_LINKS = [
  { label: "Music", to: "/music" },
  { label: "Videos", to: "/videos" },
  { label: "Archive", to: "/archive" },
  { label: "Shows", to: "/shows" },
  { label: "Community", to: "/wall" },
  { label: "Downloads", to: "/downloads" },
  { label: "Cases", to: "/cases" },
  { label: "Radio", to: "/radio" },
];

const GRID_SIZE = 21;
const CELL = 8;

// Build QR-like matrix once, outside component
function buildQRMatrix(): number[][] {
  const matrix: number[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => 0),
  );

  function finder(r: number, c: number) {
    for (let dr = 0; dr < 7; dr++) {
      for (let dc = 0; dc < 7; dc++) {
        const onBorder = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const onInner = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        matrix[r + dr][c + dc] = onBorder || onInner ? 1 : 0;
      }
    }
  }

  finder(0, 0);
  finder(0, 14);
  finder(14, 0);

  for (let i = 8; i < 13; i++) {
    matrix[6][i] = i % 2 === 0 ? 1 : 0;
    matrix[i][6] = i % 2 === 0 ? 1 : 0;
  }

  matrix[8][0] = 1;
  matrix[8][1] = 1;
  matrix[0][8] = 1;
  matrix[1][8] = 1;
  matrix[7][8] = 1;
  matrix[8][7] = 1;

  const reserved = new Set<string>();
  for (let r = 0; r <= 8; r++)
    for (let c = 0; c <= 8; c++) reserved.add(`${r},${c}`);
  for (let r = 0; r <= 8; r++)
    for (let c = 13; c <= 20; c++) reserved.add(`${r},${c}`);
  for (let r = 13; r <= 20; r++)
    for (let c = 0; c <= 8; c++) reserved.add(`${r},${c}`);
  for (let i = 8; i < 13; i++) {
    reserved.add(`6,${i}`);
    reserved.add(`${i},6`);
  }

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (!reserved.has(`${r},${c}`)) {
        matrix[r][c] = (r * 3 + c * 7 + r * c) % 3 === 0 ? 1 : 0;
      }
    }
  }
  return matrix;
}

const QR_MATRIX = buildQRMatrix();
// Precompute black cells as flat array with stable keys
const QR_CELLS: { id: number; x: number; y: number }[] = [];
for (let r = 0; r < GRID_SIZE; r++) {
  for (let c = 0; c < GRID_SIZE; c++) {
    if (QR_MATRIX[r][c] === 1) {
      QR_CELLS.push({ id: r * GRID_SIZE + c, x: c * CELL, y: r * CELL });
    }
  }
}

const SVG_SIZE = GRID_SIZE * CELL;

function QRCode() {
  return (
    <svg
      role="img"
      aria-label="QR code"
      width={SVG_SIZE}
      height={SVG_SIZE}
      viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", margin: "0 auto" }}
    >
      <title>QR code</title>
      <rect width={SVG_SIZE} height={SVG_SIZE} fill="white" />
      {QR_CELLS.map(({ id, x, y }) => (
        <rect key={id} x={x} y={y} width={CELL} height={CELL} fill="black" />
      ))}
    </svg>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleBorderClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback(
    (to: string) => {
      navigate({ to });
    },
    [navigate],
  );

  const BOX_W = 320;
  const BOX_H = 420;
  const RADIUS = 270;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Courier New', Courier, monospace",
        color: "#000000",
        padding: "2rem",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Orbital container */}
      <div
        style={{
          position: "relative",
          width: `${BOX_W}px`,
          height: `${BOX_H}px`,
        }}
      >
        {/* The border box — clickable */}
        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle navigation"
          data-ocid="landing.canvas_target"
          onClick={handleBorderClick}
          style={{
            width: "100%",
            height: "100%",
            border: "3px solid #000000",
            borderRadius: 0,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.25rem",
            cursor: "pointer",
            padding: "1.5rem",
            background: "#ffffff",
            userSelect: "none",
            outline: "none",
          }}
        >
          <QRCode />

          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              letterSpacing: "0.1em",
              lineHeight: 1,
              textAlign: "center",
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            THE HAND
          </div>

          <div
            style={{
              fontSize: "0.75rem",
              lineHeight: 1.8,
              textAlign: "center",
              fontFamily: "'Courier New', Courier, monospace",
              color: "#000000",
            }}
          >
            <div>J. Morrow</div>
            <div>C. Drake</div>
            <div>P. Ellis</div>
            <div>R. Vance</div>
          </div>
        </button>

        {/* Orbital nav links */}
        {NAV_LINKS.map((link, i) => {
          const angle = (i / NAV_LINKS.length) * 2 * Math.PI - Math.PI / 2;
          const x = BOX_W / 2 + RADIUS * Math.cos(angle);
          const y = BOX_H / 2 + RADIUS * Math.sin(angle);
          const scale = open ? 1 : 0.8;

          return (
            <button
              key={link.label}
              type="button"
              data-ocid={`nav.link.${i + 1}`}
              onClick={(e) => {
                e.stopPropagation();
                handleNavClick(link.to);
              }}
              style={{
                position: "absolute",
                left: `${x}px`,
                top: `${y}px`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.85rem",
                color: "#000000",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
                opacity: open ? 1 : 0,
                pointerEvents: open ? "auto" : "none",
                transition: `opacity 0.25s ease ${i * 40}ms, transform 0.25s ease ${i * 40}ms`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.textDecoration =
                  "underline";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.textDecoration =
                  "none";
              }}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Hint text */}
      <div
        style={{
          marginTop: "1.25rem",
          fontSize: "0.7rem",
          fontFamily: "'Courier New', Courier, monospace",
          color: "#000000",
          letterSpacing: "0.05em",
        }}
      >
        {open ? "[click to close]" : "[click border to explore]"}
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "fixed",
          bottom: "1rem",
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: "0.6rem",
          fontFamily: "'Courier New', Courier, monospace",
          color: "#888888",
        }}
      >
        &copy; {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#888888" }}
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
