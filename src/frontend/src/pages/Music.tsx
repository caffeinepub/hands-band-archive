import type { MusicRelease } from "../backend.d";
import ArchivalHeader from "../components/ArchivalHeader";
import { useMusicReleases } from "../hooks/useQueries";

const sampleReleases: MusicRelease[] = [
  {
    id: 1n,
    title: "Residue",
    subtitle: "Full Length",
    notes:
      "Recorded in a rented practice space over three weekends. Mostly first takes.",
    recordingNotes: "4-track to digital. Rooms mics only. No headphones.",
    dateRecorded: "Feb 2022",
    trackList: [
      "Residue",
      "Ghost Circuit",
      "Shallow End",
      "Tape Hiss",
      "Low Signal",
      "Exit Wound",
    ],
    artworkDescription:
      "Close-up of weathered cassette tape unspooled on concrete.",
  },
  {
    id: 2n,
    title: "Live at the Basement",
    subtitle: "Live Recording",
    notes:
      "One mic. One night. Brooklyn. You can hear someone's phone go off during track 2.",
    recordingNotes: "Single SM58 hung from a water pipe. No overdubs.",
    dateRecorded: "Nov 2020",
    trackList: [
      "Opening Static",
      "Raw / Uncut",
      "Floor Level",
      "Low Signal (alt)",
    ],
    artworkDescription:
      "Blurry crowd shot from the stage. Someone is holding a beer.",
  },
  {
    id: 3n,
    title: "Demos 2018\u20132019",
    subtitle: "Unreleased",
    notes:
      "Before we had a name. Before we had a clue. These are the ones we almost deleted.",
    recordingNotes:
      "Bedroom recordings. Phone mic in some places. Might fix someday.",
    dateRecorded: "2018\u20132019",
    trackList: [
      "Early Version",
      "Practice Tape #4",
      "Unfinished Thing",
      "No Title",
    ],
    artworkDescription: "A blank cassette label written in marker: DEMOS.",
  },
];

export default function MusicPage() {
  const { data, isLoading } = useMusicReleases();
  const releases = data && data.length > 0 ? data : sampleReleases;

  return (
    <div className="min-h-screen pb-20">
      <ArchivalHeader
        imageSrc="/assets/generated/header-performers-2.dim_1200x400.jpg"
        tint="blue"
      />
      <div className="px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10 mt-6">
            <p
              className="text-xs font-mono mb-1"
              style={{
                color: "oklch(0.35 0.005 60)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
              }}
            >
              CLASSIFIED AUDIO EVIDENCE
            </p>
            <h1
              className="glitch text-2xl md:text-4xl font-mono font-bold tracking-widest uppercase"
              data-text="MUSIC ARCHIVE // FILE CABINET A-1"
              style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.1em" }}
            >
              {"MUSIC ARCHIVE // FILE CABINET A-1"}
            </h1>
            <div
              className="mt-3"
              style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
            />
          </div>

          {isLoading && (
            <div data-ocid="music.loading_state" className="text-center py-20">
              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  letterSpacing: "0.3em",
                }}
              >
                LOADING AUDIO FILES...
              </p>
            </div>
          )}

          <div data-ocid="music.list" className="space-y-8">
            {releases.length === 0 && !isLoading && (
              <div data-ocid="music.empty_state" className="text-center py-20">
                <p
                  className="font-mono text-xs"
                  style={{
                    color: "oklch(0.35 0.005 60)",
                    letterSpacing: "0.3em",
                  }}
                >
                  NO AUDIO FILES RECOVERED
                </p>
              </div>
            )}
            {releases.map((release, i) => (
              <div
                key={String(release.id)}
                data-ocid={`music.item.${i + 1}`}
                className="evidence-card"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.5 : 0.5}deg)` }}
              >
                {/* Folder tab header */}
                <div
                  className="absolute -top-4 left-4 px-3 py-1 font-mono font-bold text-xs"
                  style={{
                    background: "oklch(0.16 0.004 60)",
                    border: "1px dashed oklch(0.28 0.005 60)",
                    borderBottom: "none",
                    color: "oklch(0.80 0.10 85)",
                    letterSpacing: "0.15em",
                    fontSize: "0.65rem",
                  }}
                >
                  {release.title}
                </div>

                <div className="pt-2">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-4">
                    <div>
                      <h2
                        className="font-mono font-bold text-xl"
                        style={{ color: "oklch(0.88 0.01 85)" }}
                      >
                        {release.title}
                      </h2>
                      <p
                        className="font-mono text-xs"
                        style={{
                          color: "oklch(0.45 0.005 60)",
                          letterSpacing: "0.1em",
                        }}
                      >
                        {release.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className="font-mono text-xs"
                        style={{
                          color: "oklch(0.40 0.005 60)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                        }}
                      >
                        DATE DISCOVERED:
                      </p>
                      <p
                        className="font-mono text-xs"
                        style={{ color: "oklch(0.65 0.08 240)" }}
                      >
                        {release.dateRecorded}
                      </p>
                    </div>
                  </div>

                  {/* Notes */}
                  <p
                    className="font-mono text-xs italic mb-4"
                    style={{ color: "oklch(0.58 0.007 85)", lineHeight: "1.7" }}
                  >
                    {release.notes}
                  </p>

                  {/* Tracklist */}
                  <div className="mb-4">
                    <p
                      className="font-mono text-xs mb-2"
                      style={{
                        color: "oklch(0.40 0.005 60)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.2em",
                      }}
                    >
                      EVIDENCE ITEMS (TRACKS):
                    </p>
                    <ol className="space-y-1">
                      {release.trackList.map((track, ti) => (
                        <li
                          key={`${ti}-${track}`}
                          className="font-mono text-xs flex items-center gap-3"
                          style={{ color: "oklch(0.75 0.008 85)" }}
                        >
                          <span
                            style={{
                              color: "oklch(0.35 0.005 60)",
                              fontSize: "0.6rem",
                              minWidth: "1.5rem",
                            }}
                          >
                            {String(ti + 1).padStart(2, "0")}.
                          </span>
                          {track}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Recording notes + play */}
                  <div
                    className="flex items-end justify-between flex-wrap gap-3 pt-3"
                    style={{ borderTop: "1px dashed oklch(0.20 0.004 60)" }}
                  >
                    <p
                      className="font-mono text-xs italic"
                      style={{
                        color: "oklch(0.42 0.005 60)",
                        fontSize: "0.65rem",
                        maxWidth: "60%",
                      }}
                    >
                      {release.recordingNotes}
                    </p>
                    <button
                      type="button"
                      className="font-mono text-xs tracking-widest px-3 py-1 transition-colors"
                      style={{
                        border: "1px solid oklch(0.40 0.005 60)",
                        color: "oklch(0.65 0.08 240)",
                        background: "transparent",
                        letterSpacing: "0.15em",
                        fontSize: "0.65rem",
                        cursor: "crosshair",
                      }}
                    >
                      ▶ PLAY
                    </button>
                  </div>
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
