import type { Download, DownloadType } from "../backend.d";
import ArchivalHeader from "../components/ArchivalHeader";
import { useDownloads } from "../hooks/useQueries";

const sampleDownloads: Download[] = [
  {
    id: 1n,
    title: "Hands Logo — Hi-Res",
    downloadType: "art" as unknown as DownloadType,
    description: "Black and white. 3000x3000. Use it, share it, print it.",
    fileUrl: "#",
  },
  {
    id: 2n,
    title: "Residue Tour Poster",
    downloadType: "poster" as unknown as DownloadType,
    description: "11x17 print-ready PDF. Designed by the band.",
    fileUrl: "#",
  },
  {
    id: 3n,
    title: "Tape Hiss Demo",
    downloadType: "demo" as unknown as DownloadType,
    description: "Early version. Rough mix. Not the album take.",
    fileUrl: "#",
  },
  {
    id: 4n,
    title: "Phone Wallpaper Pack",
    downloadType: "wallpaper" as unknown as DownloadType,
    description: "5 wallpapers. Dark archive aesthetic. For phones.",
    fileUrl: "#",
  },
  {
    id: 5n,
    title: "Digital Zine #1 — Origin",
    downloadType: "zine" as unknown as DownloadType,
    description: "12 pages. How the band started. Photos, drawings, writing.",
    fileUrl: "#",
  },
  {
    id: 6n,
    title: "Lyrics Sheet — Residue LP",
    downloadType: "lyrics" as unknown as DownloadType,
    description: "Full lyrics. Handwritten originals, scanned.",
    fileUrl: "#",
  },
];

const typeColors: Record<string, string> = {
  art: "oklch(0.80 0.06 10)",
  poster: "oklch(0.85 0.12 85)",
  demo: "oklch(0.55 0.18 20)",
  wallpaper: "oklch(0.65 0.08 240)",
  zine: "oklch(0.75 0.06 150)",
  lyrics: "oklch(0.52 0.005 60)",
};

export default function DownloadsPage() {
  const { data, isLoading } = useDownloads();
  const downloads = data && data.length > 0 ? data : sampleDownloads;

  return (
    <div className="min-h-screen pb-20">
      <ArchivalHeader
        imageSrc="/assets/generated/header-dancer-4.dim_1200x400.jpg"
        tint="none"
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
              TAKE WHAT YOU NEED. LEAVE WHAT YOU DON'T.
            </p>
            <h1
              className="glitch text-2xl md:text-4xl font-mono font-bold tracking-widest uppercase"
              data-text="FREE TRANSMISSIONS // DOWNLOADS"
              style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.1em" }}
            >
              {"FREE TRANSMISSIONS // DOWNLOADS"}
            </h1>
            <div
              className="mt-3"
              style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
            />
          </div>

          {isLoading && (
            <div
              data-ocid="downloads.loading_state"
              className="text-center py-20"
            >
              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  letterSpacing: "0.3em",
                }}
              >
                LOADING FILE REGISTRY...
              </p>
            </div>
          )}

          <div
            data-ocid="downloads.list"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {downloads.length === 0 && !isLoading && (
              <div
                data-ocid="downloads.empty_state"
                className="col-span-full text-center py-16"
              >
                <p
                  className="font-mono text-xs"
                  style={{
                    color: "oklch(0.35 0.005 60)",
                    letterSpacing: "0.3em",
                  }}
                >
                  NO FILES AVAILABLE
                </p>
              </div>
            )}
            {downloads.map((dl, i) => {
              const typeStr =
                typeof dl.downloadType === "string"
                  ? dl.downloadType
                  : String(dl.downloadType);
              const tagColor = typeColors[typeStr] || typeColors.art;
              return (
                <div
                  key={String(dl.id)}
                  data-ocid={`downloads.item.${i + 1}`}
                  className="evidence-card"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -0.6 : 0.4}deg)`,
                  }}
                >
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
                  </div>

                  <h3
                    className="font-mono font-bold text-sm mb-2"
                    style={{
                      color: "oklch(0.82 0.01 85)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {dl.title}
                  </h3>

                  <p
                    className="font-mono text-xs mb-4"
                    style={{
                      color: "oklch(0.55 0.006 85)",
                      lineHeight: "1.6",
                      fontSize: "0.7rem",
                    }}
                  >
                    {dl.description}
                  </p>

                  <a
                    data-ocid={`downloads.item.${i + 1}.button`}
                    href={dl.fileUrl}
                    className="font-mono text-xs tracking-widest px-3 py-1 inline-block transition-colors"
                    style={{
                      border: "1px solid oklch(0.35 0.005 60)",
                      color: "oklch(0.55 0.007 85)",
                      letterSpacing: "0.15em",
                      fontSize: "0.6rem",
                      cursor: "crosshair",
                    }}
                  >
                    ↓ DOWNLOAD
                  </a>
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
