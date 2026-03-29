"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const TYPING_LINES = [
  '> route "deploy north-star to staging"',
  "  FastPath: layer 3 keyword match → coder",
  "  Session s-8f2a created (Redis HASH)",
  "  [IDENTITY] coder | [TOOLS] 8 active",
  "  Claude CLI executing... 47.2s $0.39",
  '  Result: "Deployed to staging.proop.pl"',
  "  ContractEvaluator: score 0.94 PASS",
  "  MemoryWriter: hot + recent updated",
  "> _",
];

function TypingTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLine >= TYPING_LINES.length) {
      const timeout = setTimeout(() => {
        setLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const line = TYPING_LINES[currentLine];
    if (currentChar < line.length) {
      const speed = line.startsWith(">") ? 40 : 15;
      const timeout = setTimeout(() => setCurrentChar((c) => c + 1), speed);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, line]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, line.startsWith(">") ? 600 : 200);
    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const activeLine =
    currentLine < TYPING_LINES.length
      ? TYPING_LINES[currentLine].slice(0, currentChar)
      : "";

  return (
    <div className="relative font-mono text-[13px] leading-relaxed">
      {lines.map((line, i) => (
        <div
          key={i}
          className={
            line.startsWith(">")
              ? "text-accent"
              : line.includes("PASS")
                ? "text-accent-dim"
                : line.includes("$")
                  ? "text-amber"
                  : "text-text-secondary"
          }
        >
          {line}
        </div>
      ))}
      {currentLine < TYPING_LINES.length && (
        <div
          className={
            activeLine.startsWith(">") ? "text-accent" : "text-text-secondary"
          }
        >
          {activeLine}
          {showCursor && (
            <span className="inline-block w-[7px] h-[15px] bg-accent ml-[1px] align-middle" />
          )}
        </div>
      )}
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large emerald orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full animate-float"
        style={{
          top: "-10%",
          right: "-5%",
          background:
            "radial-gradient(circle, rgba(110,231,183,0.06) 0%, transparent 70%)",
          animationDelay: "0s",
        }}
      />
      {/* Amber orb */}
      <div
        className="absolute w-[350px] h-[350px] rounded-full animate-float"
        style={{
          bottom: "10%",
          left: "-5%",
          background:
            "radial-gradient(circle, rgba(252,211,77,0.04) 0%, transparent 70%)",
          animationDelay: "-3s",
        }}
      />
      {/* Small accent */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full animate-float"
        style={{
          top: "40%",
          left: "30%",
          background:
            "radial-gradient(circle, rgba(110,231,183,0.03) 0%, transparent 70%)",
          animationDelay: "-1.5s",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <FloatingOrbs />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg animate-grid-fade" />

      {/* Radial fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void to-transparent z-10" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-accent text-sm font-mono font-medium tracking-wide">
                SYSTEM ONLINE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95]"
            >
              <span className="block text-glow">PROOPLEX</span>
              <span className="block mt-2 text-text-secondary font-light text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight">
                AI Agent
                <br />
                Orchestration
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 text-lg text-text-secondary leading-relaxed max-w-lg"
            >
              Autonomous multi-agent routing. Persistent memory.
              Self-correcting execution. Contract-verified results.
              <span className="text-amber font-medium"> One command, zero babysitting.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <a
                href="#features"
                className="px-6 py-3 rounded-xl bg-accent text-void font-semibold text-sm tracking-wide hover:bg-accent-dim transition-all duration-300 glow-accent"
              >
                Explore Platform
              </a>
              <a
                href="#architecture"
                className="px-6 py-3 rounded-xl border border-white/10 text-text-secondary text-sm font-medium hover:border-accent/30 hover:text-accent transition-all duration-300"
              >
                Architecture
              </a>
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bento-card p-1 glow-accent">
              {/* Terminal chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <span className="ml-3 text-xs text-muted font-mono">
                  prooplex gateway
                </span>
              </div>
              {/* Terminal body */}
              <div className="p-5 min-h-[280px] relative overflow-hidden">
                <div className="scan-line" />
                <TypingTerminal />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
