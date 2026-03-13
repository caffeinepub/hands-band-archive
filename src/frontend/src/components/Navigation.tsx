import { Link, useRouterState } from "@tanstack/react-router";

const links = [
  { path: "/home", label: "[HOME]" },
  { path: "/music", label: "[MUSIC]" },
  { path: "/videos", label: "[VIDEO]" },
  { path: "/archive", label: "[ARCHIVE]" },
  { path: "/shows", label: "[SHOWS]" },
  { path: "/wall", label: "[WALL]" },
  { path: "/downloads", label: "[DL]" },
];

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-4 py-2 flex items-center justify-between"
      style={{
        background: "oklch(0.06 0.002 60 / 0.92)",
        backdropFilter: "blur(2px)",
        borderBottom: "1px solid oklch(0.18 0.004 60)",
      }}
    >
      <Link
        to="/"
        className="text-xs font-mono tracking-widest"
        style={{ color: "oklch(0.40 0.005 60)", letterSpacing: "0.2em" }}
      >
        HANDS/
      </Link>
      <div className="flex items-center gap-1 flex-wrap justify-end">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            data-ocid={"nav.link"}
            className={`nav-link text-xs px-2 py-1 transition-colors ${
              currentPath === link.path ? "active" : ""
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
