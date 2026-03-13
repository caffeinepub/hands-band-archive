import { Link } from "@tanstack/react-router";
import ArchivalHeader from "../components/ArchivalHeader";

interface CaseFile {
  caseNum: string;
  name: string;
  charge: string;
  role: string;
  evidence: string;
  rotate: number;
  offsetX: number;
  offsetY: number;
}

const caseFiles: CaseFile[] = [
  {
    caseNum: "CASE #001",
    name: "RILEY CROSS",
    charge: "Illegal Use of Feedback",
    role: "Guitar, Vocals",
    evidence:
      "Excessive use of reverb pedals. Known to play past midnight. Neighbors filed 14 complaints.",
    rotate: -2.5,
    offsetX: 0,
    offsetY: 0,
  },
  {
    caseNum: "CASE #002",
    name: "JUNE PARK",
    charge: "Possession of Excessive Guitar Pedals",
    role: "Guitar",
    evidence:
      "Pedalboard confiscated 3 times. Still at large. Estimated 47 pedals at last count.",
    rotate: 1.8,
    offsetX: 0,
    offsetY: 0,
  },
  {
    caseNum: "CASE #003",
    name: "SAM DELACROIX",
    charge: "Sonic Vandalism",
    role: "Bass",
    evidence:
      "Tuned guitar in a church. No remorse. Reported to have laughed during the incident.",
    rotate: -1.2,
    offsetX: 0,
    offsetY: 0,
  },
  {
    caseNum: "CASE #004",
    name: "FELIX ORIN",
    charge: "Tape Recorder Abuse",
    role: "Drums",
    evidence:
      "Records everything. Even your conversations. Carries 3 recorders at all times.",
    rotate: 2.8,
    offsetX: 0,
    offsetY: 0,
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
              className="text-xs font-mono tracking-widest"
              style={{
                color: "oklch(0.35 0.005 60)",
                letterSpacing: "0.3em",
                fontSize: "0.6rem",
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
            className="text-xs font-mono"
            style={{ color: "oklch(0.40 0.005 60)", letterSpacing: "0.2em" }}
          >
            EVIDENCE ARCHIVE — ONGOING INVESTIGATION
          </p>

          {/* Divider line */}
          <div
            className="mt-4"
            style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
          />
        </div>

        {/* Case file cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {caseFiles.map((c, i) => (
              <div
                key={c.caseNum}
                data-ocid={`home.item.${i + 1}`}
                className="evidence-card relative"
                style={{ transform: `rotate(${c.rotate}deg)` }}
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
                  className="text-xs font-mono mb-1"
                  style={{
                    color: "oklch(0.40 0.005 60)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  {c.caseNum}
                </p>

                {/* Name */}
                <h2
                  className="font-mono font-bold text-lg mb-3 tracking-widest"
                  style={{
                    color: "oklch(0.88 0.01 85)",
                    letterSpacing: "0.15em",
                  }}
                >
                  {c.name}
                </h2>

                {/* Divider */}
                <div
                  className="mb-3"
                  style={{
                    height: "1px",
                    background: "oklch(0.22 0.004 60)",
                    borderTop: "1px dashed oklch(0.25 0.005 60)",
                  }}
                />

                {/* Charge */}
                <div className="mb-2">
                  <p
                    className="text-xs font-mono"
                    style={{
                      color: "oklch(0.45 0.005 60)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    CHARGE:
                  </p>
                  <p
                    className="font-mono font-bold text-sm"
                    style={{ color: "oklch(0.85 0.12 85)" }}
                  >
                    {c.charge}
                  </p>
                </div>

                {/* Role */}
                <div className="mb-2">
                  <p
                    className="text-xs font-mono"
                    style={{
                      color: "oklch(0.45 0.005 60)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    ROLE:
                  </p>
                  <p
                    className="font-mono text-sm"
                    style={{ color: "oklch(0.70 0.008 85)" }}
                  >
                    {c.role}
                  </p>
                </div>

                {/* Evidence notes */}
                <div
                  className="mt-3 pt-3"
                  style={{ borderTop: "1px dashed oklch(0.20 0.004 60)" }}
                >
                  <p
                    className="text-xs font-mono"
                    style={{
                      color: "oklch(0.45 0.005 60)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                    }}
                  >
                    EVIDENCE NOTES:
                  </p>
                  <p
                    className="font-mono text-xs mt-1"
                    style={{ color: "oklch(0.58 0.007 85)", lineHeight: "1.6" }}
                  >
                    {c.evidence}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
            className="text-xs font-mono text-center"
            style={{
              color: "oklch(0.28 0.004 60)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
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
