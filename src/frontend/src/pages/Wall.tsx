import { useState } from "react";
import { toast } from "sonner";
import type { CommunityPost } from "../backend.d";
import ArchivalHeader from "../components/ArchivalHeader";
import { useAddCommunityPost, useCommunityPosts } from "../hooks/useQueries";

const samplePosts: CommunityPost[] = [
  {
    id: 1n,
    author: "static_fan",
    message:
      "Found this site randomly at 2am. Been listening to Residue on repeat for three weeks. Thank you.",
    timestamp: 1700000000000n,
  },
  {
    id: 2n,
    author: "reel_to_reel",
    message:
      "Saw you at the Cellar show. Cried during Tape Hiss. Was that normal? Asking for myself.",
    timestamp: 1700100000000n,
  },
  {
    id: 3n,
    author: "june_copy",
    message:
      "The pedalboard photo in the archive... I count 52 pedals. The investigation continues.",
    timestamp: 1700200000000n,
  },
  {
    id: 4n,
    author: "noisy_ghost",
    message:
      "Someone please release the living room session properly. I'm begging.",
    timestamp: 1700300000000n,
  },
];

function formatTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts);
    if (ms < 1000000000000) return "[RECEIVED: UNKNOWN]"; // nanoseconds fallback
    const d = new Date(ms);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `[RECEIVED: ${month}/${day}/${year}]`;
  } catch {
    return "[RECEIVED: UNKNOWN]";
  }
}

export default function WallPage() {
  const { data, isLoading } = useCommunityPosts();
  const posts = data && data.length > 0 ? data : samplePosts;
  const addPost = useAddCommunityPost();

  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) {
      toast.error("TRANSMISSION INCOMPLETE — FILL ALL FIELDS");
      return;
    }
    try {
      await addPost.mutateAsync({
        author: author.trim(),
        message: message.trim(),
      });
      toast.success("TRANSMISSION RECEIVED");
      setAuthor("");
      setMessage("");
    } catch {
      toast.error("TRANSMISSION FAILED — TRY AGAIN");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <ArchivalHeader
        imageSrc="/assets/generated/header-performers-2.dim_1200x400.jpg"
        tint="blue"
      />
      <div className="px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 mt-6">
            <p
              className="text-xs font-mono mb-1"
              style={{
                color: "oklch(0.35 0.005 60)",
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
              }}
            >
              LEAVE A NOTE FOR THE ARCHIVE.
            </p>
            <h1
              className="glitch text-2xl md:text-4xl font-mono font-bold tracking-widest uppercase"
              data-text="THE WALL // FAN TRANSMISSIONS"
              style={{ color: "oklch(0.88 0.01 85)", letterSpacing: "0.1em" }}
            >
              {"THE WALL // FAN TRANSMISSIONS"}
            </h1>
            <div
              className="mt-3"
              style={{ height: "1px", background: "oklch(0.20 0.004 60)" }}
            />
          </div>

          {/* Transmit form */}
          <form
            onSubmit={handleSubmit}
            className="evidence-card mb-10"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            <p
              className="font-mono text-xs mb-4"
              style={{
                color: "oklch(0.40 0.005 60)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
              }}
            >
              {"// NEW TRANSMISSION"}
            </p>

            <div className="mb-3">
              <label
                htmlFor="wall-author"
                className="font-mono text-xs block mb-1"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                }}
              >
                HANDLE / ALIAS:
              </label>
              <input
                data-ocid="wall.input"
                id="wall-author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                maxLength={40}
                placeholder="your_handle"
                className="w-full font-mono text-sm px-3 py-2"
                style={{
                  background: "oklch(0.08 0.002 60)",
                  border: "1px solid oklch(0.22 0.004 60)",
                  color: "oklch(0.88 0.01 85)",
                  outline: "none",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.8rem",
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="wall-message"
                className="font-mono text-xs block mb-1"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                }}
              >
                MESSAGE (MAX 280):
              </label>
              <textarea
                id="wall-message"
                data-ocid="wall.textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 280))}
                rows={4}
                placeholder="leave a trace..."
                className="w-full font-mono text-sm px-3 py-2 resize-none"
                style={{
                  background: "oklch(0.08 0.002 60)",
                  border: "1px solid oklch(0.22 0.004 60)",
                  color: "oklch(0.88 0.01 85)",
                  outline: "none",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.8rem",
                  lineHeight: "1.6",
                }}
              />
              <p
                className="font-mono text-right"
                style={{
                  color: "oklch(0.32 0.004 60)",
                  fontSize: "0.55rem",
                  marginTop: "2px",
                }}
              >
                {message.length}/280
              </p>
            </div>

            <button
              data-ocid="wall.submit_button"
              type="submit"
              disabled={addPost.isPending}
              className="font-mono text-xs tracking-widest px-6 py-2 transition-colors disabled:opacity-50"
              style={{
                background: "transparent",
                border: "1px solid oklch(0.55 0.007 85)",
                color: "oklch(0.75 0.008 85)",
                letterSpacing: "0.2em",
                fontSize: "0.65rem",
                cursor: addPost.isPending ? "wait" : "crosshair",
              }}
            >
              {addPost.isPending ? "TRANSMITTING..." : "TRANSMIT MESSAGE"}
            </button>

            {addPost.isError && (
              <p
                data-ocid="wall.error_state"
                className="font-mono text-xs mt-2"
                style={{ color: "oklch(0.55 0.18 20)", fontSize: "0.6rem" }}
              >
                TRANSMISSION FAILED
              </p>
            )}
          </form>

          {isLoading && (
            <div data-ocid="wall.loading_state" className="text-center py-10">
              <p
                className="font-mono text-xs"
                style={{
                  color: "oklch(0.40 0.005 60)",
                  letterSpacing: "0.3em",
                }}
              >
                RECEIVING TRANSMISSIONS...
              </p>
            </div>
          )}

          <div data-ocid="wall.list" className="space-y-4">
            {posts.length === 0 && !isLoading && (
              <div data-ocid="wall.empty_state" className="text-center py-10">
                <p
                  className="font-mono text-xs"
                  style={{
                    color: "oklch(0.35 0.005 60)",
                    letterSpacing: "0.3em",
                  }}
                >
                  NO TRANSMISSIONS YET. BE THE FIRST.
                </p>
              </div>
            )}
            {posts.map((post, i) => (
              <div
                key={String(post.id)}
                data-ocid={`wall.item.${i + 1}`}
                className="evidence-card"
                style={{ transform: `rotate(${i % 2 === 0 ? 0.3 : -0.4}deg)` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <p
                    className="font-mono font-bold text-sm"
                    style={{
                      color: "oklch(0.78 0.008 85)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {post.author}
                  </p>
                  <p
                    className="font-mono"
                    style={{
                      color: "oklch(0.32 0.004 60)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {formatTimestamp(post.timestamp)}
                  </p>
                </div>
                <p
                  className="font-mono text-sm"
                  style={{
                    color: "oklch(0.65 0.007 85)",
                    lineHeight: "1.7",
                    fontSize: "0.8rem",
                  }}
                >
                  {post.message}
                </p>
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
