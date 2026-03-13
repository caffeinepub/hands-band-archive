import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const tracks = [
  { title: "Rehearsal Tape", meta: "2019 — Undisclosed Location" },
  { title: "Van Recording", meta: "Somewhere in Wales" },
  { title: "Late Night Studio Fragment", meta: "Unknown Date" },
  { title: "Basement Session", meta: "Never Finished" },
  { title: "Voice Memo — Riley", meta: "4am, Undisclosed" },
  { title: "Field Recording #12", meta: "Warehouse, East London" },
];

export default function RadioPage() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [signalBars, setSignalBars] = useState([3, 5, 7, 6, 4, 3, 5, 4]);
  const [onAir, setOnAir] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const signalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onAirRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cycle tracks
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setTrackIndex((prev) => (prev + 1) % tracks.length);
        setProgress(0);
        setFadeIn(true);
      }, 800);
    }, 8000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Fake progress
  useEffect(() => {
    if (!isPlaying) return;
    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.3));
    }, 80);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying]);

  // Signal bars animation
  useEffect(() => {
    signalRef.current = setInterval(() => {
      setSignalBars(
        Array.from({ length: 8 }, () => Math.floor(Math.random() * 8) + 1),
      );
    }, 250);
    return () => {
      if (signalRef.current) clearInterval(signalRef.current);
    };
  }, []);

  // ON AIR flicker
  useEffect(() => {
    onAirRef.current = setInterval(() => {
      setOnAir((v) => {
        if (Math.random() > 0.92) return !v;
        return v;
      });
    }, 200);
    return () => {
      if (onAirRef.current) clearInterval(onAirRef.current);
    };
  }, []);

  const currentTrack = tracks[trackIndex];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020202",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
      }}
    >
      {/* Film grain */}
      <div className="grain-overlay" />
      <div className="scan-lines" />

      {/* Ambient glow */}
      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "300px",
          background:
            "radial-gradient(ellipse, oklch(0.35 0.08 240 / 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Main container */}
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            className="flicker"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "1.1rem",
              fontWeight: "bold",
              letterSpacing: "0.3em",
              color: "oklch(0.72 0.08 240)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            ◉ LOST RECORDINGS RADIO
          </h1>
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.5rem",
              letterSpacing: "0.25em",
              color: "oklch(0.35 0.005 60)",
              textTransform: "uppercase",
            }}
          >
            TRANSMISSION IN PROGRESS — DO NOT DISTRIBUTE
          </p>
        </div>

        {/* Radio chassis */}
        <div
          style={{
            background: "oklch(0.08 0.003 60)",
            border: "2px solid oklch(0.22 0.006 60)",
            boxShadow:
              "0 0 40px oklch(0.35 0.08 240 / 0.10), inset 0 0 20px oklch(0 0 0 / 0.5)",
            padding: "24px",
          }}
        >
          {/* Top row: frequency + on air */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              borderBottom: "1px solid oklch(0.18 0.004 60)",
              paddingBottom: "16px",
            }}
          >
            {/* Frequency display */}
            <div
              style={{
                background: "oklch(0.05 0.002 60)",
                border: "1px solid oklch(0.20 0.005 240)",
                padding: "6px 14px",
                boxShadow: "0 0 8px oklch(0.50 0.10 240 / 0.20)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.45rem",
                  letterSpacing: "0.15em",
                  color: "oklch(0.45 0.005 60)",
                  marginBottom: "2px",
                  textTransform: "uppercase",
                }}
              >
                FREQUENCY
              </p>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  letterSpacing: "0.1em",
                  color: "oklch(0.72 0.10 240)",
                  textShadow: "0 0 8px oklch(0.72 0.10 240 / 0.5)",
                }}
              >
                88.4 FM
              </p>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.42rem",
                  letterSpacing: "0.1em",
                  color: "oklch(0.35 0.005 60)",
                  textTransform: "uppercase",
                }}
              >
                RESTRICTED FREQUENCY
              </p>
            </div>

            {/* Signal bars */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "2px",
                height: "32px",
              }}
            >
              {signalBars.map((h, idx) => (
                <div
                  key={["p0", "p1", "p2", "p3", "p4", "p5", "p6", "p7"][idx]}
                  style={{
                    width: "4px",
                    height: `${(h / 8) * 32}px`,
                    background: `oklch(${0.4 + (h / 8) * 0.3} 0.10 240)`,
                    transition: "height 0.15s",
                  }}
                />
              ))}
            </div>

            {/* ON AIR indicator */}
            <div
              style={{
                background: onAir
                  ? "oklch(0.55 0.18 20 / 0.15)"
                  : "transparent",
                border: `1px solid oklch(0.55 0.18 20 / ${onAir ? "0.8" : "0.2"})`,
                padding: "4px 10px",
                transition: "all 0.1s",
              }}
            >
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                  letterSpacing: "0.2em",
                  color: `oklch(0.70 0.18 20 / ${onAir ? "1" : "0.3"})`,
                  textTransform: "uppercase",
                  textShadow: onAir
                    ? "0 0 6px oklch(0.70 0.18 20 / 0.5)"
                    : "none",
                }}
              >
                ● ON AIR
              </p>
            </div>
          </div>

          {/* Now playing */}
          <div
            style={{
              marginBottom: "20px",
              background: "oklch(0.06 0.002 60)",
              border: "1px dashed oklch(0.22 0.005 60)",
              padding: "12px 16px",
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.45rem",
                letterSpacing: "0.2em",
                color: "oklch(0.35 0.005 60)",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              NOW BROADCASTING:
            </p>
            <div
              style={{
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 0.6s",
              }}
            >
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.95rem",
                  fontWeight: "bold",
                  color: "oklch(0.85 0.08 85)",
                  marginBottom: "4px",
                  letterSpacing: "0.05em",
                }}
              >
                {currentTrack.title}
              </p>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.6rem",
                  color: "oklch(0.45 0.005 60)",
                  letterSpacing: "0.1em",
                  fontStyle: "italic",
                }}
              >
                {currentTrack.meta}
              </p>
            </div>
          </div>

          {/* Cassette deck */}
          <div
            style={{
              background: "oklch(0.07 0.002 60)",
              border: "1px solid oklch(0.18 0.004 60)",
              padding: "16px",
              marginBottom: "16px",
            }}
          >
            {/* Cassette body */}
            <div
              style={{
                border: "1px solid oklch(0.25 0.005 60)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "12px",
                background: "oklch(0.10 0.003 60)",
              }}
            >
              {/* Left reel */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "3px solid oklch(0.30 0.005 60)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: isPlaying ? "spinReel 2s linear infinite" : "none",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid oklch(0.40 0.006 60)",
                    background: "oklch(0.15 0.003 60)",
                  }}
                />
              </div>

              {/* Label */}
              <div style={{ flex: 1, textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.45rem",
                    letterSpacing: "0.15em",
                    color: "oklch(0.40 0.005 60)",
                    textTransform: "uppercase",
                  }}
                >
                  HANDS — LOST RECORDINGS
                </p>
                <p
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.38rem",
                    color: "oklch(0.30 0.004 60)",
                    marginTop: "2px",
                  }}
                >
                  SIDE A — UNAUTHORIZED RELEASE
                </p>
              </div>

              {/* Right reel */}
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "3px solid oklch(0.30 0.005 60)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  animation: isPlaying
                    ? "spinReel 2.4s linear infinite reverse"
                    : "none",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    border: "2px solid oklch(0.40 0.006 60)",
                    background: "oklch(0.15 0.003 60)",
                  }}
                />
              </div>
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <button
                type="button"
                data-ocid="radio.toggle"
                onClick={() => setIsPlaying((p) => !p)}
                style={{
                  background: "oklch(0.18 0.004 60)",
                  border: "1px solid oklch(0.32 0.006 60)",
                  color: "oklch(0.72 0.008 85)",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.7rem",
                  padding: "4px 12px",
                  cursor: "crosshair",
                  letterSpacing: "0.1em",
                }}
              >
                {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
              </button>
              <p
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.45rem",
                  color: "oklch(0.35 0.005 60)",
                  letterSpacing: "0.1em",
                  marginLeft: "auto",
                  textTransform: "uppercase",
                }}
              >
                TRACK {trackIndex + 1}/{tracks.length}
              </p>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: "3px",
                background: "oklch(0.16 0.003 60)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "oklch(0.60 0.08 240)",
                  transition: "width 0.08s linear",
                  boxShadow: "2px 0 6px oklch(0.60 0.08 240 / 0.6)",
                }}
              />
            </div>
          </div>

          {/* VU meter */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2px",
              height: "20px",
              marginBottom: "16px",
              padding: "0 4px",
            }}
          >
            {(
              [
                "a",
                "b",
                "c",
                "d",
                "e",
                "f",
                "g",
                "h",
                "i",
                "j",
                "k",
                "l",
                "m",
                "n",
                "o",
                "p",
                "q",
                "r",
                "s",
                "t",
                "u",
                "v",
                "w",
                "x",
              ] as const
            ).map((ch, i) => {
              return (
                <div
                  key={`vu-${ch}`}
                  style={{
                    flex: 1,
                    height: `${(Math.sin(i * 0.8) * 0.5 + 0.5) * 18 + 4}px`,
                    background:
                      i > 18
                        ? "oklch(0.55 0.18 20 / 0.6)"
                        : i > 12
                          ? "oklch(0.80 0.15 85 / 0.5)"
                          : "oklch(0.50 0.08 240 / 0.5)",
                    opacity: isPlaying ? 0.7 : 0.2,
                    transition: "height 0.1s, opacity 0.3s",
                  }}
                />
              );
            })}
          </div>

          {/* Warning */}
          <div
            style={{
              borderTop: "1px solid oklch(0.18 0.004 60)",
              paddingTop: "12px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "'Courier New', monospace",
                fontSize: "0.45rem",
                letterSpacing: "0.2em",
                color: "oklch(0.38 0.005 60)",
                textTransform: "uppercase",
                lineHeight: "1.6",
              }}
            >
              THIS BROADCAST IS UNAUTHORIZED. HANDLE WITH CARE.
              <br />
              DO NOT SHARE. DO NOT DISTRIBUTE. DO NOT ENJOY TOO LOUDLY.
            </p>
          </div>
        </div>

        {/* Track list */}
        <div
          style={{
            marginTop: "20px",
            border: "1px dashed oklch(0.18 0.004 60)",
            padding: "12px",
          }}
        >
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.45rem",
              letterSpacing: "0.2em",
              color: "oklch(0.30 0.004 60)",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            BROADCAST SCHEDULE — TONIGHT ONLY
          </p>
          {tracks.map((t, i) => (
            <div
              key={t.title}
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                padding: "3px 0",
                borderBottom: "1px solid oklch(0.12 0.002 60)",
                opacity: i === trackIndex ? 1 : 0.4,
              }}
            >
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.45rem",
                  color:
                    i === trackIndex
                      ? "oklch(0.72 0.08 240)"
                      : "oklch(0.30 0.004 60)",
                  letterSpacing: "0.1em",
                  minWidth: "20px",
                }}
              >
                {i === trackIndex ? "▶" : `0${i + 1}.`}
              </span>
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.55rem",
                  color:
                    i === trackIndex
                      ? "oklch(0.80 0.06 85)"
                      : "oklch(0.40 0.005 60)",
                  letterSpacing: "0.05em",
                }}
              >
                {t.title}
              </span>
              <span
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.42rem",
                  color: "oklch(0.28 0.004 60)",
                  marginLeft: "auto",
                  fontStyle: "italic",
                }}
              >
                {t.meta}
              </span>
            </div>
          ))}
        </div>

        {/* Return link */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <Link
            to="/home"
            data-ocid="radio.link"
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: "oklch(0.38 0.005 60)",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
          >
            ← RETURN TO ARCHIVE
          </Link>
        </div>

        {/* Secret hint */}
        <p
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.4rem",
            letterSpacing: "0.1em",
            color: "oklch(0.18 0.002 60)",
            textAlign: "center",
            marginTop: "40px",
            textTransform: "uppercase",
          }}
        >
          YOU WERE NOT SUPPOSED TO FIND THIS.
        </p>
      </div>
    </div>
  );
}
