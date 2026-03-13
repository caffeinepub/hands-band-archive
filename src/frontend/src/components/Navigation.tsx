import { Link, useRouterState } from "@tanstack/react-router";

interface PosterLink {
  path: string;
  title: string;
  subtitle: string;
  rotate: number;
}

const posterLinks: PosterLink[] = [
  {
    path: "/home",
    title: "THE HANDS",
    subtitle: "INVESTIGATION ONGOING",
    rotate: -1.5,
  },
  {
    path: "/music",
    title: "TONIGHT: THE HANDS ORCHESTRA",
    subtitle: "MUSICAL EVIDENCE ON RECORD",
    rotate: 0.8,
  },
  {
    path: "/videos",
    title: "MOVING PICTURES",
    subtitle: "LO-FI RECORDINGS",
    rotate: -2.0,
  },
  {
    path: "/archive",
    title: "RECORDED INCIDENTS",
    subtitle: "ARTIFACTS & MEMORIES",
    rotate: 1.2,
  },
  {
    path: "/shows",
    title: "PUBLIC GATHERINGS",
    subtitle: "APPEARANCES & EVENTS",
    rotate: -0.7,
  },
  {
    path: "/wall",
    title: "WITNESS STATEMENTS",
    subtitle: "PUBLIC TESTIMONY",
    rotate: 1.8,
  },
  {
    path: "/downloads",
    title: "CONFISCATED MATERIAL",
    subtitle: "FREE FOR THE TAKING",
    rotate: -1.3,
  },
  {
    path: "/cases",
    title: "CASE FILES",
    subtitle: "SUBJECT DOSSIERS",
    rotate: 0.5,
  },
];

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-3 py-2"
      style={{
        background: "oklch(0.05 0.002 60 / 0.96)",
        backdropFilter: "blur(2px)",
        borderBottom: "1px solid oklch(0.16 0.004 60)",
      }}
    >
      <div
        className="flex items-center gap-1 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
      >
        {/* Brand */}
        <Link
          to="/"
          data-ocid="nav.link"
          className="flex-shrink-0 mr-2"
          style={{}}
        >
          <div
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              color: "oklch(0.35 0.005 60)",
              textTransform: "uppercase",
              transform: "rotate(-1deg)",
              lineHeight: 1,
            }}
          >
            ◈ HANDS/
          </div>
        </Link>

        <div
          style={{
            width: "1px",
            height: "32px",
            background: "oklch(0.18 0.003 60)",
            flexShrink: 0,
            marginRight: "4px",
          }}
        />

        {/* Poster cards */}
        {posterLinks.map((link) => {
          const isActive = currentPath === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              data-ocid="nav.link"
              style={{
                transform: `rotate(${link.rotate}deg)`,
                display: "inline-block",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  background: isActive
                    ? "oklch(0.22 0.04 80)"
                    : "oklch(0.16 0.03 80)",
                  border: isActive
                    ? "1px solid oklch(0.50 0.08 80)"
                    : "1px solid oklch(0.28 0.04 80)",
                  padding: "3px 7px",
                  position: "relative",
                  minWidth: "60px",
                  maxWidth: "110px",
                  boxShadow: "1px 2px 4px oklch(0 0 0 / 0.5)",
                  transition: "all 0.15s",
                }}
                className="poster-card"
              >
                {/* Aged texture overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 0.04) 2px, oklch(0 0 0 / 0.04) 3px)",
                    pointerEvents: "none",
                  }}
                />
                {/* Top decorative line */}
                <div
                  style={{
                    borderTop: `1px solid oklch(${isActive ? "0.50 0.08 80" : "0.32 0.04 80"})`,
                    marginBottom: "2px",
                    paddingTop: "2px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Courier New', monospace",
                      fontSize: "0.48rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      color: isActive
                        ? "oklch(0.90 0.10 85)"
                        : "oklch(0.65 0.06 80)",
                      lineHeight: 1.1,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {link.title}
                  </p>
                </div>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.38rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isActive
                      ? "oklch(0.65 0.05 80)"
                      : "oklch(0.40 0.03 80)",
                    lineHeight: 1.1,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    borderTop: `1px solid oklch(${isActive ? "0.35 0.05 80" : "0.22 0.03 80"})`,
                    paddingTop: "2px",
                    marginTop: "2px",
                  }}
                >
                  {link.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
