interface ArchivalHeaderProps {
  imageSrc: string;
  tint?: "pink" | "blue" | "yellow" | "none";
}

export default function ArchivalHeader({ imageSrc }: ArchivalHeaderProps) {
  return (
    <div
      className="w-full"
      style={{ marginTop: "64px", height: "280px", overflow: "hidden" }}
    >
      <img
        src={imageSrc}
        alt="1920s performer"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center top",
          filter: "grayscale(100%) contrast(0.7) brightness(0.6)",
          display: "block",
        }}
      />
    </div>
  );
}
