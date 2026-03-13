import { useState } from "react";

interface EvidenceItem {
  id: string;
  type: "cassette" | "polaroid" | "envelope" | "pick" | "notebook" | "ticket";
  label: string;
  sublabel: string;
  reveal: string;
  rotate: number;
  topOffset: number;
  leftPct: string;
  asciiArt: string;
}

const items: EvidenceItem[] = [
  {
    id: "cassette",
    type: "cassette",
    label: "DEMO TAPE #7 — 2021",
    sublabel: "SIDE A",
    reveal: "Unreleased demo. Recorded at 3am after the show. Never mixed.",
    rotate: -3,
    topOffset: 0,
    leftPct: "0%",
    asciiArt: "[▶ ○○○○○○○○○○○○○○ ○]",
  },
  {
    id: "polaroid",
    type: "polaroid",
    label: "TOUR — SOMEWHERE IN OREGON",
    sublabel: "OCT 2022",
    reveal: "Found in the van. No one remembers taking this.",
    rotate: 2.5,
    topOffset: 0,
    leftPct: "17%",
    asciiArt: "┌─────────┐\n│ ░░▒▒░░▒ │\n│ ▒░░▒▒░░ │\n│ ░▒▒░░▒▒ │\n└─────────┘",
  },
  {
    id: "envelope",
    type: "envelope",
    label: "CONFIDENTIAL",
    sublabel: "DO NOT OPEN",
    reveal: "Lyric drafts. First version of 'Glass Weather'. Never performed.",
    rotate: -1.5,
    topOffset: 0,
    leftPct: "34%",
    asciiArt:
      "╔═══════════╗\n║  ╲     ╱  ║\n║   ╲   ╱   ║\n║    _/    ║\n╚═══════════╝",
  },
  {
    id: "pick",
    type: "pick",
    label: "EXHIBIT B — PICK #003",
    sublabel: "PHYSICAL EVIDENCE",
    reveal:
      "Recovered from the stage after the Cellar show. Still has pick marks.",
    rotate: 3.5,
    topOffset: 0,
    leftPct: "51%",
    asciiArt: "  ╔═══╗\n  ║ ◈ ║\n  ╚═╤═╝\n   ╲│╱\n    ▼",
  },
  {
    id: "notebook",
    type: "notebook",
    label: "FIELD NOTES — 2022",
    sublabel: "RILEY'S REHEARSAL LOG",
    reveal:
      "Riley's rehearsal notebook. Contains chord charts and crossed-out lyrics.",
    rotate: -2.8,
    topOffset: 0,
    leftPct: "68%",
    asciiArt: "║█║─────\n║█║ C#m\n║█║ → Am\n║█║ [x]",
  },
  {
    id: "ticket",
    type: "ticket",
    label: "ADMIT ONE — MARCH 2020",
    sublabel: "THE CELLAR — LONDON",
    reveal: "Last show before the lockdown. Never finished the set.",
    rotate: 1.8,
    topOffset: 0,
    leftPct: "83%",
    asciiArt:
      "┌──────────┐\n│ ADMIT 1  │\n│ ─────────│\n│ MAR 2020 │\n└──────────┘",
  },
];

export default function EvidenceLocker() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <section className="max-w-5xl mx-auto mt-20 mb-8">
      {/* Section header */}
      <div className="mb-6">
        <p
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.35em",
            color: "oklch(0.35 0.005 60)",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          SECURE STORAGE — AUTHORIZED ACCESS ONLY
        </p>
        <h2
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "1.4rem",
            fontWeight: "bold",
            letterSpacing: "0.2em",
            color: "oklch(0.88 0.01 85)",
            textTransform: "uppercase",
          }}
        >
          ▣ EVIDENCE LOCKER
        </h2>
        <div
          style={{
            height: "1px",
            background: "oklch(0.20 0.004 60)",
            marginTop: "8px",
          }}
        />
      </div>

      {/* Cabinet / shelf container */}
      <div
        style={{
          background: "oklch(0.10 0.003 60)",
          border: "2px solid oklch(0.22 0.005 60)",
          borderTop: "6px solid oklch(0.25 0.006 60)",
          padding: "32px 16px 24px",
          position: "relative",
          boxShadow:
            "inset 0 4px 20px oklch(0 0 0 / 0.4), 0 4px 12px oklch(0 0 0 / 0.5)",
        }}
      >
        {/* Cabinet label */}
        <div
          style={{
            position: "absolute",
            top: "-1px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "oklch(0.18 0.04 80)",
            border: "1px solid oklch(0.30 0.05 80)",
            padding: "1px 12px",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.5rem",
            letterSpacing: "0.25em",
            color: "oklch(0.60 0.06 80)",
            textTransform: "uppercase",
          }}
        >
          EVIDENCE — CASE #HANDS — DO NOT DISTURB
        </div>

        {/* Shelf line */}
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            left: "12px",
            right: "12px",
            height: "3px",
            background: "oklch(0.18 0.004 60)",
            boxShadow: "0 2px 6px oklch(0 0 0 / 0.4)",
            pointerEvents: "none",
          }}
        />

        {/* Items row */}
        <div
          className="flex flex-wrap gap-4 justify-center items-end"
          style={{ minHeight: "160px", paddingBottom: "16px" }}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              data-ocid={`evidence.item.${i + 1}`}
              className="relative cursor-crosshair"
              style={{
                transform: `rotate(${item.rotate}deg)`,
                transition: "transform 0.2s",
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => e.key === "Enter" && toggleItem(item.id)}
            >
              {/* The item card */}
              <div
                style={{
                  background:
                    item.type === "pick"
                      ? "transparent"
                      : item.type === "cassette"
                        ? "oklch(0.14 0.006 240)"
                        : item.type === "polaroid"
                          ? "oklch(0.90 0.005 60)"
                          : item.type === "envelope"
                            ? "oklch(0.75 0.06 80)"
                            : item.type === "notebook"
                              ? "oklch(0.80 0.08 85)"
                              : "oklch(0.85 0.04 60)",
                  border:
                    item.type === "pick"
                      ? "2px dashed oklch(0.45 0.08 150 / 0.8)"
                      : item.type === "cassette"
                        ? "1px solid oklch(0.28 0.008 240)"
                        : item.type === "polaroid"
                          ? "6px solid oklch(0.88 0.004 60)"
                          : "1px solid oklch(0.40 0.03 80)",
                  padding: item.type === "pick" ? "8px" : "8px 10px",
                  minWidth: "90px",
                  maxWidth: "120px",
                  position: "relative",
                  boxShadow:
                    hoveredItem === item.id
                      ? "0 8px 20px oklch(0 0 0 / 0.7)"
                      : "2px 4px 8px oklch(0 0 0 / 0.5)",
                  transform:
                    hoveredItem === item.id ? "scale(1.06)" : "scale(1)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
              >
                {/* Evidence stamp on pick bag */}
                {item.type === "pick" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.4rem",
                      letterSpacing: "0.1em",
                      color: "oklch(0.45 0.08 150)",
                      border: "1px solid oklch(0.45 0.08 150)",
                      padding: "0 3px",
                    }}
                  >
                    EVIDENCE
                  </div>
                )}

                {/* ASCII art */}
                <pre
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.5rem",
                    lineHeight: 1.3,
                    color:
                      item.type === "polaroid"
                        ? "oklch(0.15 0.003 60)"
                        : item.type === "envelope" ||
                            item.type === "notebook" ||
                            item.type === "ticket"
                          ? "oklch(0.20 0.004 60)"
                          : "oklch(0.72 0.008 240)",
                    margin: 0,
                    whiteSpace: "pre",
                  }}
                >
                  {item.asciiArt}
                </pre>

                {/* Label */}
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.42rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: "6px",
                    color:
                      item.type === "polaroid" ||
                      item.type === "envelope" ||
                      item.type === "notebook" ||
                      item.type === "ticket"
                        ? "oklch(0.18 0.003 60)"
                        : "oklch(0.58 0.006 240)",
                    lineHeight: 1.2,
                    fontWeight: "bold",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.38rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color:
                      item.type === "polaroid" ||
                      item.type === "envelope" ||
                      item.type === "notebook" ||
                      item.type === "ticket"
                        ? "oklch(0.30 0.004 60)"
                        : "oklch(0.40 0.005 60)",
                  }}
                >
                  {item.sublabel}
                </p>
              </div>

              {/* Hover note */}
              {hoveredItem === item.id && activeItem !== item.id && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%) rotate(0deg)",
                    background: "oklch(0.85 0.12 85)",
                    border: "1px solid oklch(0.75 0.10 85)",
                    padding: "4px 8px",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.45rem",
                    letterSpacing: "0.05em",
                    color: "oklch(0.15 0.003 60)",
                    zIndex: 10,
                    maxWidth: "200px",
                    whiteSpace: "normal" as const,
                    textAlign: "center",
                    boxShadow: "2px 2px 6px oklch(0 0 0 / 0.4)",
                  }}
                >
                  click to open
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reveal panel */}
        {activeItem && (
          <div
            style={{
              marginTop: "16px",
              borderTop: "1px dashed oklch(0.25 0.005 60)",
              paddingTop: "16px",
            }}
          >
            {items
              .filter((it) => it.id === activeItem)
              .map((it) => (
                <div
                  key={it.id}
                  style={{
                    background: "oklch(0.12 0.004 60)",
                    border: "1px dashed oklch(0.30 0.006 60)",
                    padding: "12px 16px",
                    maxWidth: "480px",
                    margin: "0 auto",
                    transform: "rotate(-0.5deg)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.5rem",
                      letterSpacing: "0.2em",
                      color: "oklch(0.40 0.005 60)",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    EXHIBIT — {it.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.75rem",
                      color: "oklch(0.82 0.08 85)",
                      lineHeight: "1.6",
                      fontStyle: "italic",
                    }}
                  >
                    "{it.reveal}"
                  </p>
                  <button
                    type="button"
                    data-ocid="evidence.close_button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveItem(null);
                    }}
                    style={{
                      marginTop: "10px",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.5rem",
                      letterSpacing: "0.15em",
                      color: "oklch(0.40 0.005 60)",
                      background: "transparent",
                      border: "none",
                      cursor: "crosshair",
                      textTransform: "uppercase",
                    }}
                  >
                    [ CLOSE FILE ]
                  </button>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Floor label */}
      <p
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "0.45rem",
          letterSpacing: "0.2em",
          color: "oklch(0.25 0.004 60)",
          textTransform: "uppercase",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        ALL ITEMS LOGGED — CHAIN OF CUSTODY MAINTAINED — UNAUTHORIZED REMOVAL IS
        A CRIMINAL OFFENCE
      </p>
    </section>
  );
}
