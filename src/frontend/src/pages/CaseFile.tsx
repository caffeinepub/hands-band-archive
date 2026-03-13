import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import ArchivalHeader from "../components/ArchivalHeader";

const headerImages: Record<string, string> = {
  "001": "/assets/generated/header-singer-1.dim_1200x400.jpg",
  "002": "/assets/generated/header-performers-2.dim_1200x400.jpg",
  "003": "/assets/generated/header-singer-3.dim_1200x400.jpg",
  "004": "/assets/generated/header-dancer-4.dim_1200x400.jpg",
};

const memberData: Record<
  string,
  {
    name: string;
    alias: string;
    instrument: string;
    lastSeen: string;
    associates: string;
    charges: string[];
    notes: string[];
    redactedLyric: string;
    artifacts: string[];
  }
> = {
  "001": {
    name: "RILEY CROSS",
    alias: "THE REVERB GHOST",
    instrument: "Guitar, Vocals",
    lastSeen: "Rehearsal Studio B, East London",
    associates: "June Park, Sam Delacroix, Felix Orin",
    charges: [
      "Illegal Use of Feedback",
      "Disturbing the Peace Through Amplification",
      "Unauthorized Emotional Manipulation",
    ],
    notes: [
      "Recorded this after everyone left the studio.",
      "Still not sure what this song was about.",
      "Don't show this to the others.",
    ],
    redactedLyric: "I left the lights on / so you'd know I was / still waiting",
    artifacts: [
      "Demo: Glass Weather (unfinished)",
      "Voice memo — 3am, undisclosed",
      "Chord chart for 'Hollow Room'",
      "Tour photo — Oregon 2022",
    ],
  },
  "002": {
    name: "JUNE PARK",
    alias: "THE PEDAL ARCHITECT",
    instrument: "Guitar",
    lastSeen: "Unknown. Last signal: Bristol.",
    associates: "Riley Cross, Sam Delacroix, Felix Orin",
    charges: [
      "Possession of Excessive Guitar Pedals",
      "Sonic Trespassing",
      "Distorting Reality Without Permit",
    ],
    notes: [
      "Pedalboard confiscated. Again.",
      "The 47th pedal was the one that did it.",
      "She knows what she did.",
    ],
    redactedLyric:
      "Every signal sent / returns as noise / every note / a small confession",
    artifacts: [
      "Pedalboard schematics — classified",
      "Demo: Wire Animals (rough)",
      "Setlist from the Cellar, 2022",
      "Polaroid — unknown venue",
    ],
  },
  "003": {
    name: "SAM DELACROIX",
    alias: "THE FREQUENCY",
    instrument: "Bass",
    lastSeen: "Church basement. No remorse.",
    associates: "Riley Cross, June Park, Felix Orin",
    charges: [
      "Sonic Vandalism",
      "Tuning in Sacred Spaces",
      "Disturbing Structural Frequencies",
    ],
    notes: [
      "The bass line came to me at 4am.",
      "It's not a riff. It's a vibration.",
      "The church never recovered.",
    ],
    redactedLyric:
      "Low end / carry me / through the / concrete / and the doubt",
    artifacts: [
      "Bass tab — 'Hollow Room' original",
      "Field recording — abandoned warehouse",
      "Letter to the audience (unsent)",
      "Demo: Concrete Garden",
    ],
  },
  "004": {
    name: "FELIX ORIN",
    alias: "THE ARCHIVIST",
    instrument: "Drums, Field Recordings",
    lastSeen: "Believed to be recording everything.",
    associates: "Riley Cross, June Park, Sam Delacroix",
    charges: [
      "Tape Recorder Abuse",
      "Unauthorized Documentation",
      "Preserving Evidence Without License",
    ],
    notes: [
      "Everything gets recorded. Everything.",
      "This one I recorded without telling anyone.",
      "There are 47 tapes. I know where they all are.",
    ],
    redactedLyric: "The tape rolls / even when / you stop / playing",
    artifacts: [
      "Cassette: Rehearsal #31 (unlabeled)",
      "Field recording — rain, venue loading dock",
      "Drum notation — 'Glass Weather'",
      "Archive box: contents classified",
    ],
  },
};

const allIds = ["001", "002", "003", "004"];

export default function CaseFilePage() {
  const { id } = useParams({ from: "/layout/case/$id" });
  const [redactedRevealed, setRedactedRevealed] = useState(false);
  const [fingerprintClicked, setFingerprintClicked] = useState(false);

  const member = memberData[id];
  if (!member) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Courier New', monospace",
          color: "oklch(0.50 0.16 20)",
        }}
      >
        FILE NOT FOUND — ACCESS DENIED
      </div>
    );
  }

  const currentIndex = allIds.indexOf(id);
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId =
    currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "80px",
        background: "oklch(0.07 0.002 60)",
      }}
    >
      <ArchivalHeader
        imageSrc={
          headerImages[id] ||
          "/assets/generated/header-singer-1.dim_1200x400.jpg"
        }
        tint="none"
      />

      <div style={{ padding: "0 24px" }}>
        <div
          style={{ maxWidth: "720px", margin: "0 auto", paddingTop: "28px" }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Link
              to="/cases"
              data-ocid="case.link"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "oklch(0.40 0.005 60)",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              ← CASE FILES
            </Link>
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                color: "oklch(0.28 0.004 60)",
              }}
            >
              /
            </span>
            <span
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "oklch(0.50 0.005 60)",
                textTransform: "uppercase",
              }}
            >
              CASE FILE {id}
            </span>
          </div>

          {/* Main dossier */}
          <div
            style={{
              background: "oklch(0.10 0.004 60)",
              border: "1px solid oklch(0.25 0.005 60)",
              boxShadow: "0 4px 24px oklch(0 0 0 / 0.6)",
              padding: "28px 28px 24px",
              position: "relative",
            }}
          >
            {/* Aged texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "repeating-linear-gradient(0deg, transparent, transparent 22px, oklch(0 0 0 / 0.03) 22px, oklch(0 0 0 / 0.03) 23px)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />

            <div style={{ position: "relative", zIndex: 1 }}>
              {/* Top header row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                {/* Left: case stamp */}
                <div>
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.3em",
                      color: "oklch(0.35 0.005 60)",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    METROPOLITAN EVIDENCE ARCHIVE
                  </p>
                  <h1
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      letterSpacing: "0.2em",
                      color: "oklch(0.88 0.01 85)",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    CASE FILE — {id}
                  </h1>
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      color: "oklch(0.50 0.005 60)",
                      textTransform: "uppercase",
                    }}
                  >
                    SUBJECT: {member.name}
                  </p>
                </div>

                {/* Right: classified stamp + photo */}
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Photo placeholder */}
                  <div
                    style={{
                      width: "80px",
                      height: "96px",
                      border: "1px solid oklch(0.30 0.005 60)",
                      background: "oklch(0.07 0.002 60)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.4rem",
                        color: "oklch(0.50 0.16 20)",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        textAlign: "center",
                        fontWeight: "bold",
                        lineHeight: 1.4,
                      }}
                    >
                      PHOTO
                      <br />
                      WITHHELD
                    </p>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.85rem",
                        color: "oklch(0.28 0.004 60)",
                        marginTop: "8px",
                      }}
                    >
                      ◉
                    </p>
                  </div>

                  <div style={{ transform: "rotate(6deg)" }}>
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.65rem",
                        fontWeight: "bold",
                        letterSpacing: "0.2em",
                        color: "oklch(0.50 0.16 20)",
                        border: "2px solid oklch(0.50 0.16 20)",
                        padding: "2px 8px",
                        opacity: 0.85,
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: "6px",
                      }}
                    >
                      CLASSIFIED
                    </span>
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.5rem",
                        fontWeight: "bold",
                        letterSpacing: "0.15em",
                        color: "oklch(0.55 0.18 20)",
                        border: "1px solid oklch(0.55 0.18 20)",
                        padding: "1px 5px",
                        opacity: 0.75,
                        textTransform: "uppercase",
                        display: "block",
                      }}
                    >
                      CONFIDENTIAL
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  borderTop: "1px dashed oklch(0.22 0.004 60)",
                  marginBottom: "20px",
                }}
              />

              {/* Fields */}
              {(
                [
                  ["NAME", member.name],
                  ["ALIAS", member.alias],
                  ["PRIMARY INSTRUMENT", member.instrument],
                  ["LAST SEEN LOCATION", member.lastSeen],
                  ["KNOWN ASSOCIATES", member.associates],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr",
                    gap: "8px",
                    marginBottom: "8px",
                    paddingBottom: "8px",
                    borderBottom: "1px solid oklch(0.14 0.003 60)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      color: "oklch(0.40 0.005 60)",
                      textTransform: "uppercase",
                      paddingTop: "2px",
                    }}
                  >
                    {label}:
                  </p>
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.8rem",
                      color: "oklch(0.78 0.008 85)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}

              {/* Charges */}
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "oklch(0.60 0.16 20)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    borderBottom: "1px solid oklch(0.40 0.12 20 / 0.3)",
                    paddingBottom: "4px",
                  }}
                >
                  ▣ CRIMINAL CHARGES
                </p>
                {member.charges.map((charge, i) => (
                  <div
                    key={charge}
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.55rem",
                        color: "oklch(0.60 0.16 20)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        flexShrink: 0,
                      }}
                    >
                      CHARGE {i + 1}:
                    </span>
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.8rem",
                        color: "oklch(0.82 0.06 85)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {charge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Personal Archive */}
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "oklch(0.55 0.06 240)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    borderBottom: "1px solid oklch(0.40 0.06 240 / 0.3)",
                    paddingBottom: "4px",
                  }}
                >
                  ▣ PERSONAL ARCHIVE
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {member.artifacts.map((artifact, i) => (
                    <div
                      key={artifact}
                      style={{
                        background: "oklch(0.13 0.004 240 / 0.5)",
                        border: "1px dashed oklch(0.30 0.06 240)",
                        padding: "3px 10px",
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.55rem",
                        color: "oklch(0.65 0.06 240)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      [{String(i + 1).padStart(2, "0")}] {artifact}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confidential notes */}
              <div style={{ marginBottom: "24px" }}>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "oklch(0.65 0.08 85)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    borderBottom: "1px solid oklch(0.45 0.06 85 / 0.3)",
                    paddingBottom: "4px",
                  }}
                >
                  ▣ CONFIDENTIAL NOTES
                </p>
                {member.notes.map((note, i) => (
                  <div
                    key={note}
                    style={{
                      background: "oklch(0.85 0.10 85 / 0.06)",
                      border: "1px solid oklch(0.85 0.10 85 / 0.15)",
                      padding: "8px 12px",
                      marginBottom: "8px",
                      transform: `rotate(${((i % 3) - 1) * 0.5}deg)`,
                      maxWidth: "380px",
                    }}
                  >
                    <p
                      className="handwritten"
                      style={{
                        color: "oklch(0.80 0.10 85)",
                        fontSize: "0.9rem",
                        lineHeight: "1.4",
                        fontStyle: "italic",
                      }}
                    >
                      — {note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Redacted section */}
              <div
                style={{ marginBottom: "24px" }}
                onMouseEnter={() => setRedactedRevealed(true)}
                onMouseLeave={() => setRedactedRevealed(false)}
              >
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    color: "oklch(0.40 0.005 60)",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                    borderBottom: "1px solid oklch(0.22 0.004 60 / 0.5)",
                    paddingBottom: "4px",
                  }}
                >
                  ▣ EVIDENCE — [HOVER TO DECRYPT]
                </p>
                <div
                  data-ocid="case.panel"
                  style={{
                    background: "oklch(0.07 0.002 60)",
                    border: "1px dashed oklch(0.22 0.004 60)",
                    padding: "12px 16px",
                    cursor: "crosshair",
                    position: "relative",
                  }}
                >
                  {/* Redacted version */}
                  <div
                    style={{
                      opacity: redactedRevealed ? 0 : 1,
                      transition: "opacity 0.5s",
                      position: redactedRevealed ? "absolute" : "relative",
                      inset: redactedRevealed ? "12px 16px" : undefined,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.85rem",
                        letterSpacing: "0.1em",
                        lineHeight: "1.8",
                        color: "oklch(0.20 0.002 60)",
                      }}
                    >
                      {member.redactedLyric.split(" ").map((word) => (
                        <span key={`${word}-lyric-word`}>
                          <span className="redacted">
                            {"█".repeat(word.replace(/\//g, "").length || 1)}
                          </span>{" "}
                        </span>
                      ))}
                    </p>
                  </div>
                  {/* Revealed version */}
                  <div
                    style={{
                      opacity: redactedRevealed ? 1 : 0,
                      transition: "opacity 0.5s 0.2s",
                      position: redactedRevealed ? "relative" : "absolute",
                      inset: redactedRevealed ? undefined : "12px 16px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.9rem",
                        letterSpacing: "0.08em",
                        lineHeight: "1.8",
                        color: "oklch(0.82 0.08 85)",
                        fontStyle: "italic",
                      }}
                    >
                      {member.redactedLyric}
                    </p>
                  </div>
                </div>
              </div>

              {/* Fingerprint easter egg */}
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <button
                  type="button"
                  data-ocid="case.fingerprint_button"
                  onClick={() => setFingerprintClicked(true)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "crosshair",
                    display: "inline-block",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "2.5rem",
                      color: fingerprintClicked
                        ? "oklch(0.55 0.08 240)"
                        : "oklch(0.22 0.004 60)",
                      transition: "color 0.3s",
                      letterSpacing: "-0.05em",
                      lineHeight: 1,
                    }}
                  >
                    ◉◎◉
                    <br />
                    ◎◉◎
                    <br />
                    ◉◎◉
                  </p>
                </button>
                {fingerprintClicked && (
                  <div
                    style={{
                      marginTop: "8px",
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "oklch(0.60 0.08 240)",
                      textTransform: "uppercase",
                      animation: "fadeIn 0.3s ease-out",
                    }}
                  >
                    🔒 SECRET DEMO ACCESSED — FILE DECRYPTION IN PROGRESS...
                  </div>
                )}
                {!fingerprintClicked && (
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.4rem",
                      color: "oklch(0.28 0.004 60)",
                      textTransform: "uppercase",
                      letterSpacing: "0.15em",
                      marginTop: "4px",
                    }}
                  >
                    BIOMETRIC VERIFICATION REQUIRED
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation between cases */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "24px",
              padding: "12px 0",
              borderTop: "1px solid oklch(0.16 0.003 60)",
            }}
          >
            <div>
              {prevId ? (
                <Link
                  to="/case/$id"
                  params={{ id: prevId }}
                  data-ocid="case.secondary_button"
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "oklch(0.45 0.005 60)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  ← CASE {prevId}
                </Link>
              ) : (
                <span style={{ width: "80px", display: "inline-block" }} />
              )}
            </div>

            <Link
              to="/cases"
              data-ocid="case.link"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                color: "oklch(0.35 0.005 60)",
                textDecoration: "none",
                textTransform: "uppercase",
              }}
            >
              ALL CASES
            </Link>

            <div>
              {nextId ? (
                <Link
                  to="/case/$id"
                  params={{ id: nextId }}
                  data-ocid="case.primary_button"
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    color: "oklch(0.45 0.005 60)",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  CASE {nextId} →
                </Link>
              ) : (
                <span style={{ width: "80px", display: "inline-block" }} />
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                color: "oklch(0.28 0.004 60)",
              }}
            >
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "oklch(0.40 0.005 60)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
