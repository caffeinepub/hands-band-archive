import ArchivalHeader from "../components/ArchivalHeader";

const videoPlaceholders = [
  {
    id: 1,
    title: "REHEARSAL TAPE #1",
    label: "Practice session — undisclosed location",
    ts: "00:23:14",
  },
  {
    id: 2,
    title: "TOUR MOMENT — UNEDITED",
    label: "Tour van — somewhere in Oregon",
    ts: "01:07:44",
  },
  {
    id: 3,
    title: "CELLAR SHOW — MARCH 2022",
    label: "Live at the Cellar, Brooklyn",
    ts: "00:44:02",
  },
  {
    id: 4,
    title: "LIVING ROOM SESSION",
    label: "Acoustic run-through — Riley's apartment",
    ts: "00:31:55",
  },
  {
    id: 5,
    title: "SOUND CHECK CLIP #7",
    label: "Fragment recovered from Felix's recorder",
    ts: "00:08:21",
  },
  {
    id: 6,
    title: "WEIRD EXPERIMENT — NO LABEL",
    label: "Unknown. No context. Don't ask.",
    ts: "00:12:00",
  },
];

export default function VideosPage() {
  return (
    <div className="min-h-screen pb-20">
      <ArchivalHeader
        imageSrc="/assets/generated/header-singer-3.dim_1200x400.jpg"
        tint="pink"
      />
      <div className="px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 mt-6">
            <p
              className="text-xs font-mono mb-1"
              style={{
                color: "oklch(0.35 0.005 60)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
              }}
            >
              LO-FI RECORDINGS — PARTIALLY CLASSIFIED
            </p>
            <h1
              className="glitch text-2xl md:text-4xl font-mono font-bold tracking-widest uppercase"
              data-text="VIDEO EVIDENCE // LO-FI RECORDINGS"
              style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.1em" }}
            >
              {"VIDEO EVIDENCE // LO-FI RECORDINGS"}
            </h1>
            <div
              className="mt-3"
              style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
            />
          </div>

          <div
            data-ocid="videos.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videoPlaceholders.map((v, i) => (
              <div
                key={v.id}
                data-ocid={`videos.item.${i + 1}`}
                className="vhs-overlay relative"
                style={{
                  transform: `rotate(${i % 3 === 0 ? -1 : i % 3 === 1 ? 0.7 : -0.4}deg)`,
                  border: "2px solid oklch(0.22 0.004 60)",
                  background: "oklch(0.05 0.001 60)",
                  boxShadow:
                    "3px 4px 12px oklch(0 0 0 / 0.7), inset 0 0 20px oklch(0 0 0 / 0.4)",
                }}
              >
                {/* VHS Screen area */}
                <div
                  className="relative"
                  style={{
                    aspectRatio: "16/9",
                    background: "oklch(0.04 0.001 60)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  {/* Noise pattern */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "repeating-linear-gradient(0deg, oklch(0 0 0 / 0.1) 0px, oklch(0 0 0 / 0.1) 1px, transparent 1px, transparent 3px)",
                    }}
                  />
                  {/* Static texture */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
                      backgroundSize: "100% 100%",
                      opacity: 0.8,
                    }}
                  />
                  {/* Play button */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 3,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        border: "1px solid oklch(0.45 0.005 60)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 4px",
                      }}
                    >
                      <span
                        style={{
                          color: "oklch(0.50 0.005 60)",
                          fontSize: "1rem",
                          paddingLeft: "3px",
                        }}
                      >
                        ▶
                      </span>
                    </div>
                  </div>
                  {/* VHS Timestamp */}
                  <div
                    style={{
                      position: "absolute",
                      top: 6,
                      left: 8,
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.55rem",
                      color: "oklch(0.85 0.005 60)",
                      letterSpacing: "0.1em",
                      zIndex: 4,
                      textShadow: "0 0 4px oklch(0 0 0)",
                    }}
                  >
                    ● REC {v.ts}
                  </div>
                </div>

                {/* Label */}
                <div
                  className="p-3"
                  style={{ borderTop: "1px solid oklch(0.18 0.003 60)" }}
                >
                  <p
                    className="font-mono font-bold text-xs tracking-widest mb-1"
                    style={{
                      color: "oklch(0.78 0.008 85)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {v.title}
                  </p>
                  <p
                    className="font-mono text-xs"
                    style={{
                      color: "oklch(0.40 0.005 60)",
                      fontSize: "0.6rem",
                    }}
                  >
                    {v.label}
                  </p>
                  <button
                    type="button"
                    className="mt-2 font-mono text-xs tracking-widest"
                    style={{
                      background: "transparent",
                      border: "1px solid oklch(0.30 0.005 60)",
                      color: "oklch(0.50 0.005 60)",
                      padding: "2px 8px",
                      fontSize: "0.55rem",
                      letterSpacing: "0.15em",
                      cursor: "crosshair",
                    }}
                  >
                    ▶ PLAY TAPE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <footer
            className="mt-20 pt-6"
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
    </div>
  );
}
