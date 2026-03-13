import type { Show } from "../backend.d";
import ArchivalHeader from "../components/ArchivalHeader";
import { useShows } from "../hooks/useQueries";

const sampleShows: Show[] = [
  {
    id: 1n,
    venue: "The Black Lodge",
    city: "Portland, OR",
    date: "June 14 2026",
    isUpcoming: true,
    notes: "With Crescent Moon Delay. Doors at 8. No re-entry.",
    timestamp: 0n,
  },
  {
    id: 2n,
    venue: "Void Room",
    city: "Seattle, WA",
    date: "July 2 2026",
    isUpcoming: true,
    notes: "Intimate show. 80 cap. Show up early.",
    timestamp: 0n,
  },
  {
    id: 3n,
    venue: "Cellar Stage",
    city: "Brooklyn, NY",
    date: "March 4 2022",
    isUpcoming: false,
    notes: "First show in a real venue. We were terrified.",
    timestamp: 0n,
  },
  {
    id: 4n,
    venue: "The Warehouse",
    city: "Philadelphia, PA",
    date: "November 12 2021",
    isUpcoming: false,
    notes: "Played to 12 people. Best 12 people we ever met.",
    timestamp: 0n,
  },
];

export default function ShowsPage() {
  const { data, isLoading } = useShows();
  const shows = data && data.length > 0 ? data : sampleShows;

  const upcoming = shows.filter((s) => s.isUpcoming);
  const past = shows.filter((s) => !s.isUpcoming);

  return (
    <div className="min-h-screen pb-20">
      <ArchivalHeader
        imageSrc="/assets/generated/header-singer-1.dim_1200x400.jpg"
        tint="yellow"
      />
      <div className="px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 mt-6">
            <p
              className="text-xs font-mono mb-1"
              style={{
                color: "oklch(0.35 0.005 60)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
              }}
            >
              CONFIRMED DATES — LAST UPDATED
            </p>
            <h1
              className="glitch text-2xl md:text-4xl font-mono font-bold tracking-widest uppercase"
              data-text="SHOW LISTINGS // CONFIRMED DATES"
              style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.1em" }}
            >
              {"SHOW LISTINGS // CONFIRMED DATES"}
            </h1>
            <div
              className="mt-3"
              style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
            />
          </div>

          {isLoading && (
            <div data-ocid="shows.loading_state" className="text-center py-20">
              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  letterSpacing: "0.3em",
                }}
              >
                LOADING SHOW DATES...
              </p>
            </div>
          )}

          {/* Upcoming */}
          {upcoming.length > 0 && (
            <div className="mb-12">
              <p
                className="font-mono text-xs mb-6"
                style={{
                  color: "oklch(0.65 0.08 240)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                }}
              >
                {"// UPCOMING"}
              </p>
              <div data-ocid="shows.list" className="space-y-5">
                {upcoming.map((show, i) => (
                  <div
                    key={String(show.id)}
                    data-ocid={`shows.item.${i + 1}`}
                    className="relative pinned"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -1 : 0.8}deg)`,
                      background: "oklch(0.06 0.001 60)",
                      border: "1px solid oklch(0.30 0.005 60)",
                      padding: "1.5rem",
                      marginTop: "16px",
                      boxShadow: "2px 3px 10px oklch(0 0 0 / 0.6)",
                    }}
                  >
                    {/* Decorative border inset */}
                    <div
                      style={{
                        position: "absolute",
                        inset: "4px",
                        border: "1px solid oklch(0.20 0.004 60)",
                        pointerEvents: "none",
                      }}
                    />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p
                          className="font-mono font-bold text-2xl sm:text-3xl"
                          style={{
                            color: "oklch(0.88 0.01 85)",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {show.date}
                        </p>
                        <p
                          className="font-mono text-sm mt-1"
                          style={{ color: "oklch(0.75 0.008 85)" }}
                        >
                          {show.venue}
                        </p>
                        <p
                          className="font-mono text-xs"
                          style={{ color: "oklch(0.50 0.006 85)" }}
                        >
                          {show.city}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className="stamp"
                          style={{
                            color: "oklch(0.65 0.08 240)",
                            borderColor: "oklch(0.65 0.08 240)",
                            fontSize: "0.6rem",
                          }}
                        >
                          CONFIRMED
                        </span>
                      </div>
                    </div>
                    {show.notes && (
                      <p
                        className="font-mono text-xs mt-3 pt-2"
                        style={{
                          color: "oklch(0.42 0.005 60)",
                          borderTop: "1px dashed oklch(0.20 0.004 60)",
                          lineHeight: "1.6",
                        }}
                      >
                        {show.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past */}
          {past.length > 0 && (
            <div>
              <p
                className="font-mono text-xs mb-6"
                style={{
                  color: "oklch(0.35 0.005 60)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.25em",
                }}
              >
                {"// PAST — MOVED TO ARCHIVE"}
              </p>
              <div className="space-y-4">
                {past.map((show, i) => (
                  <div
                    key={String(show.id)}
                    data-ocid={`shows.item.${upcoming.length + i + 1}`}
                    className="relative"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? 0.5 : -0.7}deg)`,
                      background: "oklch(0.09 0.002 60)",
                      border: "1px dashed oklch(0.20 0.004 60)",
                      padding: "1rem",
                      opacity: 0.6,
                    }}
                  >
                    {/* Archived stamp */}
                    <div
                      className="absolute top-2 right-3"
                      style={{ transform: "rotate(8deg)" }}
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
                        ARCHIVED
                      </span>
                    </div>
                    <div>
                      <p
                        className="font-mono font-bold"
                        style={{
                          color: "oklch(0.60 0.006 85)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {show.date}
                      </p>
                      <p
                        className="font-mono text-xs"
                        style={{ color: "oklch(0.45 0.005 60)" }}
                      >
                        {show.venue} — {show.city}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {shows.length === 0 && !isLoading && (
            <div data-ocid="shows.empty_state" className="text-center py-20">
              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.35 0.005 60)",
                  letterSpacing: "0.3em",
                }}
              >
                NO SHOWS SCHEDULED. CHECK BACK.
              </p>
            </div>
          )}

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
