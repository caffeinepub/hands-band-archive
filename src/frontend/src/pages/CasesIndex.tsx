import { Link } from "@tanstack/react-router";
import ArchivalHeader from "../components/ArchivalHeader";

const cases = [
  {
    id: "001",
    name: "RILEY CROSS",
    role: "Guitar, Vocals",
    charge: "Illegal Use of Feedback",
    status: "ACTIVE",
    rotate: -2.5,
  },
  {
    id: "002",
    name: "JUNE PARK",
    role: "Guitar",
    charge: "Possession of Excessive Guitar Pedals",
    status: "AT LARGE",
    rotate: 1.8,
  },
  {
    id: "003",
    name: "SAM DELACROIX",
    role: "Bass",
    charge: "Sonic Vandalism",
    status: "NO REMORSE",
    rotate: -1.2,
  },
  {
    id: "004",
    name: "FELIX ORIN",
    role: "Drums, Field Recordings",
    charge: "Tape Recorder Abuse",
    status: "RECORDING THIS",
    rotate: 2.8,
  },
];

export default function CasesIndexPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        paddingBottom: "80px",
        background: "oklch(0.07 0.002 60)",
      }}
    >
      <ArchivalHeader
        imageSrc="/assets/generated/header-dancer-4.dim_1200x400.jpg"
        tint="blue"
      />

      <div style={{ padding: "0 24px" }}>
        <div
          style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "32px" }}
        >
          {/* Header */}
          <div style={{ marginBottom: "40px" }}>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.35em",
                color: "oklch(0.35 0.005 60)",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              RESTRICTED — AUTHORIZED PERSONNEL ONLY
            </p>
            <h1
              className="glitch"
              data-text="CASE FILES"
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "2.5rem",
                fontWeight: "bold",
                letterSpacing: "0.2em",
                color: "oklch(0.88 0.01 85)",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              CASE FILES
            </h1>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.65rem",
                color: "oklch(0.40 0.005 60)",
                letterSpacing: "0.15em",
              }}
            >
              SUBJECT DOSSIERS — ONGOING INVESTIGATION
            </p>
            <div
              style={{
                height: "1px",
                background: "oklch(0.20 0.004 60)",
                marginTop: "16px",
              }}
            />
          </div>

          {/* Folder grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            {cases.map((c, i) => (
              <Link
                key={c.id}
                to="/case/$id"
                params={{ id: c.id }}
                data-ocid={`cases.item.${i + 1}`}
                style={{ display: "block", textDecoration: "none" }}
              >
                <div
                  style={{
                    transform: `rotate(${c.rotate}deg)`,
                    cursor: "crosshair",
                    transition: "transform 0.2s",
                  }}
                >
                  {/* Folder tab */}
                  <div
                    style={{
                      height: "20px",
                      width: "80px",
                      background: "oklch(0.24 0.05 80)",
                      border: "1px solid oklch(0.35 0.06 80)",
                      borderBottom: "none",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.45rem",
                        fontWeight: "bold",
                        letterSpacing: "0.12em",
                        color: "oklch(0.65 0.06 80)",
                        textTransform: "uppercase",
                      }}
                    >
                      CASE {c.id}
                    </p>
                  </div>

                  {/* Folder body */}
                  <div
                    style={{
                      background: "oklch(0.20 0.04 80)",
                      border: "1px solid oklch(0.35 0.06 80)",
                      padding: "16px 14px 14px",
                      boxShadow:
                        "3px 4px 12px oklch(0 0 0 / 0.5), inset 0 0 20px oklch(0 0 0 / 0.15)",
                      position: "relative",
                      minHeight: "180px",
                    }}
                  >
                    {/* Classified stamp */}
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "8px",
                        transform: "rotate(8deg)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: "0.5rem",
                          fontWeight: "bold",
                          letterSpacing: "0.2em",
                          color: "oklch(0.50 0.16 20)",
                          border: "1px solid oklch(0.50 0.16 20)",
                          padding: "1px 5px",
                          opacity: 0.8,
                          textTransform: "uppercase",
                        }}
                      >
                        CLASSIFIED
                      </span>
                    </div>

                    {/* Photo placeholder */}
                    <div
                      style={{
                        width: "48px",
                        height: "56px",
                        border: "1px solid oklch(0.35 0.05 80)",
                        background: "oklch(0.14 0.03 60)",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: "0.35rem",
                          color: "oklch(0.50 0.16 20)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          textAlign: "center",
                          fontWeight: "bold",
                          lineHeight: "1.2",
                        }}
                      >
                        PHOTO
                        <br />
                        WITHHELD
                      </p>
                    </div>

                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.85rem",
                        fontWeight: "bold",
                        letterSpacing: "0.12em",
                        color: "oklch(0.82 0.08 85)",
                        textTransform: "uppercase",
                        marginBottom: "4px",
                      }}
                    >
                      {c.name}
                    </p>

                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.55rem",
                        color: "oklch(0.55 0.06 80)",
                        letterSpacing: "0.08em",
                        marginBottom: "8px",
                        textTransform: "uppercase",
                      }}
                    >
                      {c.role}
                    </p>

                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.5rem",
                        color: "oklch(0.40 0.04 80)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      PRIMARY CHARGE:
                    </p>
                    <p
                      style={{
                        fontFamily: "'Courier New', monospace",
                        fontSize: "0.55rem",
                        color: "oklch(0.72 0.06 85)",
                        letterSpacing: "0.04em",
                        lineHeight: 1.3,
                        marginBottom: "10px",
                      }}
                    >
                      {c.charge}
                    </p>

                    {/* Status + fingerprint */}
                    <div
                      style={{
                        borderTop: "1px dashed oklch(0.30 0.04 80)",
                        paddingTop: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: "0.45rem",
                          color: "oklch(0.60 0.10 20)",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {c.status}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Courier New', monospace",
                          fontSize: "0.55rem",
                          color: "oklch(0.45 0.05 80)",
                          letterSpacing: "0.05em",
                        }}
                        title="BIOMETRIC ID ON FILE"
                      >
                        ◉
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer note */}
          <div
            style={{
              marginTop: "60px",
              textAlign: "center",
              borderTop: "1px solid oklch(0.16 0.003 60)",
              paddingTop: "24px",
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.2em",
                color: "oklch(0.28 0.004 60)",
                textTransform: "uppercase",
              }}
            >
              ALL SUBJECTS REMAIN ACTIVE. INVESTIGATION ONGOING. DO NOT APPROACH
              WITHOUT AUTHORIZATION.
            </p>
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.55rem",
                color: "oklch(0.28 0.004 60)",
                marginTop: "12px",
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
          </div>
        </div>
      </div>
    </div>
  );
}
