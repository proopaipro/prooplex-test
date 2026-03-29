"use client";

const WORDS = [
  "ROUTING",
  "MEMORY",
  "CONTRACTS",
  "AGENTS",
  "REDIS",
  "CLAUDE",
  "SESSIONS",
  "TOOLS",
  "LEARNING",
  "EXECUTION",
  "STREAMING",
  "PERSISTENCE",
];

export default function Marquee() {
  const doubled = [...WORDS, ...WORDS];

  return (
    <div className="py-10 relative overflow-hidden border-y border-white/[0.04]">
      <div className="marquee-track flex whitespace-nowrap">
        {doubled.map((word, i) => (
          <span
            key={i}
            className="mx-8 font-display text-4xl lg:text-6xl font-extrabold text-white/[0.03] select-none"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
