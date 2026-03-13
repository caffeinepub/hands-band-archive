import { Link } from "@tanstack/react-router";
import ArchivalHeader from "../components/ArchivalHeader";
import EvidenceLocker from "../components/EvidenceLocker";

interface CaseFile {
  caseNum: string;
  id: string;
  name: string;
  charge: string;
  role: string;
  evidence: string;
  rotate: number;
}

const caseFiles: CaseFile[] = [
  {
    caseNum: "CASE #001",
    id: "001",
    name: "RILEY CROSS",
    charge: "Illegal Use of Feedback",
    role: "Guitar, Vocals",
    evidence:
      "Excessive use of reverb pedals. Known to play past midnight. Neighbors filed 14 complaints.",
    rotate: -2.5,
  },
  {
    caseNum: "CASE #002",
    id: "002",
    name: "JUNE PARK",
    charge: "Possession of Excessive Guitar Pedals",
    role: "Guitar",
    evidence:
      "Pedalboard confiscated 3 times. Still at large. Estimated 47 pedals at last count.",
    rotate: 1.8,
  },
  {
    caseNum: "CASE #003",
    id: "003",
    name: "SAM DELACROIX",
    charge: "Sonic Vandalism",
    role: "Bass",
    evidence:
      "Tuned guitar in a church. No remorse. Reported to have laughed during the incident.",
    rotate: -1.2,
  },
  {
    caseNum: "CASE #004",
    id: "004",
    name: "FELIX ORIN",
    charge: "Tape Recorder Abuse",
    role: "Drums",
    evidence:
      "Records everything. Even your conversations. Carries 3 recorders at all times.",
    rotate: 2.8,
  },
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen pb-20"
      style={{ background: "oklch(0.07 0.002 60)" }}
    >
      <ArchivalHeader
        imageSrc="/assets/generated/header-singer-1.dim_1200x400.jpg"
        tint="yellow"
      />
      <div className="px-4 md:px-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-12 mt-8">
          <div className="mb-2">
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                color: "oklch(0.35 0.005 60)",
                letterSpacing: "0.3em",
                fontSize: "0.6rem",
                textTransform: "uppercase",
              }}
            >
              CLASSIFIED DOCUMENT — ONGOING INVESTIGATION
            </p>
          </div>
          <h1
            className="glitch text-3xl md:text-5xl font-mono font-bold tracking-widest uppercase mb-1"
            data-text="CASE FILES // HANDS"
            style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.15em" }}
          >
            {"CASE FILES // HANDS"}
          </h1>
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              color: "oklch(0.40 0.005 60)",
              letterSpacing: "0.2em",
              fontSize: "0.65rem",
            }}
          >
            EVIDENCE ARCHIVE — ONGOING INVESTIGATION
          </p>
          <div
            className="mt-4"
            style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
          />
        </div>

        {/* Case file cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {caseFiles.map((c, i) => (
              <Link
                key={c.caseNum}
                to="/case/$id"
                params={{ id: c.id }}
                data-ocid={`home.item.${i + 1}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <div
                  className="evidence-card relative"
                  style={{
                    transform: `rotate(${c.rotate}deg)`,
                    transition: "transform 0.2s, box-shadow 0.2s",
                    cursor: "crosshair",
                  }}
                >
                  {/* Evidence stamp */}
                  <div
                    className="absolute top-3 right-3"
                    style={{ transform: "rotate(15deg)" }}
                  >
                    <span
                      className="stamp"
                      style={{
                        color: "oklch(0.50 0.16 20)",
                        borderColor: "oklch(0.50 0.16 20)",
                        fontSize: "0.55rem",
                        letterSpacing: "0.2em",
                      }}
                    >
                      EVIDENCE
                    </span>
                  </div>

                  {/* Case number */}
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      color: "oklch(0.40 0.005 60)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      marginBottom: "4px",
                    }}
                  >
                    {c.caseNum}
                  </p>

                  {/* Name */}
                  <h2
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      letterSpacing: "0.15em",
                      color: "oklch(0.88 0.01 85)",
                      marginBottom: "12px",
                      textTransform: "uppercase",
                    }}
                  >
                    {c.name}
                  </h2>

                  {/* Divider */}
                  <div
                    style={{
                      height: "1px",
                      borderTop: "1px dashed oklch(0.25 0.005 60)",
                      marginBottom: "12px",
                    }}
                  />

                  {/* Charge */}
                  <div style={{ marginBottom: "8px" }}>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        color: "oklch(0.45 0.005 60)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      CHARGE:
                    </p>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                        color: "oklch(0.85 0.12 85)",
                      }}
                    >
                      {c.charge}
                    </p>
                  </div>

                  {/* Role */}
                  <div style={{ marginBottom: "8px" }}>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        color: "oklch(0.45 0.005 60)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      ROLE:
                    </p>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.8rem",
                        color: "oklch(0.70 0.008 85)",
                      }}
                    >
                      {c.role}
                    </p>
                  </div>

                  {/* Evidence notes */}
                  <div
                    style={{
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: "1px dashed oklch(0.20 0.004 60)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        color: "oklch(0.45 0.005 60)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      EVIDENCE NOTES:
                    </p>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.75rem",
                        color: "oklch(0.58 0.007 85)",
                        lineHeight: "1.6",
                        marginTop: "4px",
                      }}
                    >
                      {c.evidence}
                    </p>
                  </div>

                  {/* View file link */}
                  <div style={{ marginTop: "12px", textAlign: "right" }}>
                    <span
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                        color: "oklch(0.50 0.06 240)",
                        textTransform: "uppercase",
                      }}
                    >
                      OPEN FILE →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Evidence Locker */}
          <EvidenceLocker />

          {/* Sticky note */}
          <div className="mt-16 flex justify-center">
            <div
              className="relative p-4"
              style={{
                background: "oklch(0.85 0.12 85 / 0.08)",
                border: "1px solid oklch(0.85 0.12 85 / 0.2)",
                transform: "rotate(-1.5deg)",
                maxWidth: "280px",
              }}
            >
              <p
                className="handwritten text-lg"
                style={{ color: "oklch(0.82 0.10 85)", lineHeight: "1.4" }}
              >
                they were here. — anonymous
              </p>
            </div>
          </div>

          {/* Navigation hint */}
          <div className="mt-16 text-center">
            <Link
              to="/music"
              className="text-xs font-mono tracking-widest nav-link"
              data-ocid="home.primary_button"
              style={{ fontSize: "0.65rem", letterSpacing: "0.3em" }}
            >
              EXPLORE THE ARCHIVE ↓
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="max-w-5xl mx-auto mt-20 pt-6"
          style={{ borderTop: "1px solid oklch(0.16 0.003 60)" }}
        >
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              color: "oklch(0.28 0.004 60)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
              textAlign: "center",
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
        </footer>
      </div>
    </div>
  );
}
