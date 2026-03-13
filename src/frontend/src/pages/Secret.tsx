import { Link } from "@tanstack/react-router";

const secretItems = [
  {
    title: "LOST DEMO — 2019",
    subtitle: "DO NOT DISTRIBUTE",
    description:
      "Recorded in Riley's bedroom at 3am. The version of Ghost Circuit that never was. The riff was different. Better. We don't know why we changed it.",
    redactedLine: "Location: ████████████ Portland, 97███",
    tag: "CLASSIFIED",
  },
  {
    title: "REHEARSAL TAPE — LIVING ROOM SESSION",
    subtitle: "PARTIAL AUDIO — UNEDITED",
    description:
      "Someone was eating cereal during this. You can hear it in the quiet parts between songs. We decided to keep it in.",
    redactedLine: "Participants: Riley, ██████, Sam, and █████ (unidentified)",
    tag: "RESTRICTED",
  },
  {
    title: "PERSONAL JOURNAL ENTRY — JUNE 2021",
    subtitle: "REDACTED — PERSONAL",
    description:
      "The entry about ████████████████████████ and why we almost ██████████ the band. We made it through. That's all that matters.",
    redactedLine: "DATE: ████████████████ — SUBJECT: THE DECISION",
    tag: "CLASSIFIED",
  },
];

export default function SecretPage() {
  return (
    <div
      className="min-h-screen pt-16 pb-20 px-4 md:px-8"
      style={{ background: "oklch(0.05 0.001 60)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="mt-12 mb-12">
          {/* Glitching header */}
          <div className="mb-2">
            <p
              className="font-mono text-xs"
              style={{
                color: "oklch(0.35 0.005 60)",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
              }}
            >
              FILE SYSTEM: /secret/restricted/
            </p>
          </div>
          <h1
            className="glitch text-3xl md:text-5xl font-mono font-bold tracking-widest uppercase mb-2"
            data-text="YOU FOUND IT."
            style={{ color: "oklch(0.55 0.18 20)", letterSpacing: "0.15em" }}
          >
            YOU FOUND IT.
          </h1>
          <p
            className="font-mono text-xs"
            style={{
              color: "oklch(0.38 0.005 60)",
              letterSpacing: "0.2em",
              fontSize: "0.65rem",
            }}
          >
            these files were not meant to be found.
          </p>
          <div
            className="mt-4"
            style={{ height: "1px", background: "oklch(0.50 0.18 20 / 0.3)" }}
          />
        </div>

        <div data-ocid="secret.panel" className="space-y-8">
          {secretItems.map((item, i) => (
            <div
              key={item.title}
              className="evidence-card"
              style={{
                transform: `rotate(${i % 2 === 0 ? -1.2 : 0.8}deg)`,
                borderColor: "oklch(0.50 0.18 20 / 0.3)",
              }}
            >
              {/* Classified stamp */}
              <div
                className="absolute top-3 right-3"
                style={{ transform: "rotate(12deg)" }}
              >
                <span
                  className="stamp"
                  style={{
                    color: "oklch(0.50 0.18 20)",
                    borderColor: "oklch(0.50 0.18 20)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                  }}
                >
                  {item.tag}
                </span>
              </div>

              <h2
                className="font-mono font-bold text-base mb-1"
                style={{
                  color: "oklch(0.75 0.008 85)",
                  letterSpacing: "0.1em",
                }}
              >
                {item.title}
              </h2>
              <p
                className="font-mono text-xs mb-3"
                style={{
                  color: "oklch(0.50 0.18 20)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                }}
              >
                {item.subtitle}
              </p>

              <div
                className="mb-3"
                style={{
                  height: "1px",
                  borderTop: "1px dashed oklch(0.22 0.004 60)",
                }}
              />

              <p
                className="font-mono text-xs mb-3"
                style={{
                  color: "oklch(0.55 0.006 85)",
                  lineHeight: "1.7",
                  fontSize: "0.72rem",
                }}
              >
                {item.description}
              </p>

              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.42 0.005 60)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.08em",
                }}
              >
                {item.redactedLine}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/home"
            className="font-mono text-xs tracking-widest nav-link"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "oklch(0.35 0.005 60)",
            }}
          >
            return to the archive →
          </Link>
        </div>

        <footer
          className="mt-16 pt-6"
          style={{ borderTop: "1px solid oklch(0.14 0.003 60)" }}
        >
          <p
            className="text-xs font-mono text-center"
            style={{
              color: "oklch(0.22 0.003 60)",
              fontSize: "0.55rem",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "oklch(0.32 0.004 60)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
