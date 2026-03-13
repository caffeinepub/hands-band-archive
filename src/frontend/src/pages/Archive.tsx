import { useState } from "react";
import type { ArchiveItem, Type } from "../backend.d";
import ArchivalHeader from "../components/ArchivalHeader";
import { useArchiveItems } from "../hooks/useQueries";

const sampleItems: ArchiveItem[] = [
  {
    id: 1n,
    title: "Hands @ The Cellar — March 4 2022",
    type: "flyer" as unknown as Type,
    description: "Photocopied flyer. 50 copies made. 47 ended up on the floor.",
    date: "2022-03-04",
    tags: ["live", "brooklyn", "2022"],
  },
  {
    id: 2n,
    title: "Notebook — bass lines experiment",
    type: "notebook" as unknown as Type,
    description:
      "June's notebook. Pages 14-22. The riff on page 17 became Ghost Circuit.",
    date: "2021-08-12",
    tags: ["bass", "experiments", "notebook"],
  },
  {
    id: 3n,
    title: "Polaroid from the tour van — 2021",
    type: "photo" as unknown as Type,
    description:
      "Somewhere outside Portland. Felix is asleep. Sam is eating chips.",
    date: "2021-09-03",
    tags: ["tour", "photo", "2021"],
  },
  {
    id: 4n,
    title: "Demo — before we had a name",
    type: "demo" as unknown as Type,
    description:
      "The first recording. Two mics. A phone as a click track. We were 20.",
    date: "2018-11-20",
    tags: ["demo", "early", "origin"],
  },
  {
    id: 5n,
    title: "Journal entry — the night it clicked",
    type: "journal" as unknown as Type,
    description:
      "Riley's journal, June 2021. The entry about realizing what kind of band we wanted to be.",
    date: "2021-06-14",
    tags: ["journal", "personal", "origin"],
  },
  {
    id: 6n,
    title: "Random gear photo — June's pedal wall",
    type: "photo" as unknown as Type,
    description:
      "Evidence of the excessive pedal collection. 47 at last count. Two are broken.",
    date: "2022-01-08",
    tags: ["gear", "photo", "pedals"],
  },
];

type FilterTab = "ALL" | "FLYERS" | "NOTEBOOKS" | "DEMOS" | "PHOTOS" | "OTHER";

const filterMap: Record<FilterTab, string[]> = {
  ALL: [],
  FLYERS: ["flyer"],
  NOTEBOOKS: ["notebook"],
  DEMOS: ["demo"],
  PHOTOS: ["photo"],
  OTHER: ["journal", "other"],
};

export default function ArchivePage() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("ALL");
  const { data, isLoading } = useArchiveItems();
  const items = data && data.length > 0 ? data : sampleItems;

  const filtered =
    activeFilter === "ALL"
      ? items
      : items.filter((item) => {
          const typeStr =
            typeof item.type === "string" ? item.type : String(item.type);
          return filterMap[activeFilter].includes(typeStr);
        });

  const typeColors: Record<string, string> = {
    flyer: "oklch(0.80 0.06 10)",
    notebook: "oklch(0.85 0.12 85)",
    photo: "oklch(0.65 0.08 240)",
    demo: "oklch(0.55 0.18 20)",
    journal: "oklch(0.75 0.06 150)",
    other: "oklch(0.52 0.005 60)",
  };

  return (
    <div className="min-h-screen pb-20">
      <ArchivalHeader
        imageSrc="/assets/generated/header-dancer-4.dim_1200x400.jpg"
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
              BROWSE AT YOUR OWN RISK. SOME ITEMS CLASSIFIED.
            </p>
            <h1
              className="glitch text-2xl md:text-4xl font-mono font-bold tracking-widest uppercase"
              data-text="THE ARCHIVE // PERSONAL EFFECTS & ARTIFACTS"
              style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.08em" }}
            >
              {"THE ARCHIVE // PERSONAL EFFECTS & ARTIFACTS"}
            </h1>
            <div
              className="mt-3"
              style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
            />
          </div>

          {/* Filter tabs */}
          <div data-ocid="archive.tab" className="flex flex-wrap gap-1 mb-8">
            {(Object.keys(filterMap) as FilterTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className="font-mono text-xs px-3 py-1 tracking-widest transition-colors"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  background: "transparent",
                  border: `1px solid ${activeFilter === tab ? "oklch(0.65 0.08 240)" : "oklch(0.22 0.004 60)"}`,
                  color:
                    activeFilter === tab
                      ? "oklch(0.65 0.08 240)"
                      : "oklch(0.40 0.005 60)",
                  cursor: "crosshair",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {isLoading && (
            <div
              data-ocid="archive.loading_state"
              className="text-center py-20"
            >
              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  letterSpacing: "0.3em",
                }}
              >
                LOADING ARCHIVE...
              </p>
            </div>
          )}

          <div
            data-ocid="archive.list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.length === 0 && !isLoading && (
              <div
                data-ocid="archive.empty_state"
                className="col-span-full text-center py-16"
              >
                <p
                  className="font-mono text-xs"
                  style={{
                    color: "oklch(0.35 0.005 60)",
                    letterSpacing: "0.3em",
                  }}
                >
                  NO ITEMS FOUND IN THIS CATEGORY
                </p>
              </div>
            )}
            {filtered.map((item, i) => {
              const typeStr =
                typeof item.type === "string" ? item.type : String(item.type);
              const tagColor = typeColors[typeStr] || typeColors.other;
              return (
                <div
                  key={String(item.id)}
                  data-ocid={`archive.item.${i + 1}`}
                  className="evidence-card group cursor-crosshair transition-all hover:brightness-110"
                  style={{
                    transform: `rotate(${i % 3 === 0 ? -0.8 : i % 3 === 1 ? 0.5 : -0.3}deg)`,
                  }}
                >
                  {/* Type badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="type-tag"
                      style={{
                        color: tagColor,
                        borderColor: tagColor,
                        fontSize: "0.55rem",
                        letterSpacing: "0.15em",
                      }}
                    >
                      {typeStr.toUpperCase()}
                    </span>
                    <span
                      className="font-mono"
                      style={{
                        color: "oklch(0.32 0.004 60)",
                        fontSize: "0.55rem",
                      }}
                    >
                      {item.date}
                    </span>
                  </div>

                  <h3
                    className="font-mono font-bold text-sm mb-2 uppercase"
                    style={{
                      color: "oklch(0.82 0.01 85)",
                      letterSpacing: "0.08em",
                      lineHeight: "1.3",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="font-mono text-xs mb-3"
                    style={{
                      color: "oklch(0.55 0.006 85)",
                      lineHeight: "1.6",
                      fontSize: "0.7rem",
                    }}
                  >
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-auto">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono"
                        style={{
                          color: "oklch(0.55 0.07 240)",
                          fontSize: "0.6rem",
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover reveal */}
                  <div
                    className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      fontSize: "0.6rem",
                      color: "oklch(0.65 0.08 240)",
                      letterSpacing: "0.2em",
                      fontFamily: "monospace",
                    }}
                  >
                    [ VIEW ARTIFACT ]
                  </div>
                </div>
              );
            })}
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
