interface EvidenceStampProps {
  text: string;
  rotate?: number;
  color?: "red" | "blue" | "yellow";
  className?: string;
}

export default function EvidenceStamp({
  text,
  rotate = -15,
  color = "red",
  className = "",
}: EvidenceStampProps) {
  const colorMap = {
    red: "oklch(0.55 0.18 20)",
    blue: "oklch(0.65 0.08 240)",
    yellow: "oklch(0.85 0.12 85)",
  };
  return (
    <span
      className={`stamp ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        color: colorMap[color],
        borderColor: colorMap[color],
        display: "inline-block",
        letterSpacing: "0.2em",
      }}
    >
      {text}
    </span>
  );
}
