"use client";

import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: string;
  accent: "emerald" | "amber" | "purple" | "red";
  span?: string;
  metric?: string;
  metricLabel?: string;
}

const FEATURES: Feature[] = [
  {
    title: "8-Layer Deterministic Routing",
    description:
      "FastPath router with keyword, regex, skill, history, and composite layers. 100% accuracy on known patterns. Zero LLM calls for routing.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    accent: "emerald",
    span: "lg:col-span-2",
    metric: "100%",
    metricLabel: "routing accuracy",
  },
  {
    title: "Redis Memory",
    description:
      "3-tier memory: hot facts, stable preferences, recent turns. All persisted to Redis. Agents remember across sessions.",
    icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    accent: "red",
    metric: "3",
    metricLabel: "memory tiers",
  },
  {
    title: "Self-Correction",
    description:
      "Auto-retry on failure with error context prepended. Optional model upgrade on retry. Agents learn from mistakes in real-time.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    accent: "amber",
    metric: "A09",
    metricLabel: "auto-retry",
  },
  {
    title: "Contract Evaluation",
    description:
      "Every task gets a contract. ContractEvaluator scores results. SelfLearner extracts patterns. Routing improves automatically.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "purple",
    metric: "0.94",
    metricLabel: "avg score",
  },
  {
    title: "Claude CLI Execution",
    description:
      "Real Claude CLI subprocess per task. Full tool use, 600s timeout, cwd isolation. Not a wrapper — actual agentic execution with 8 tools.",
    icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    accent: "emerald",
    span: "lg:col-span-2",
    metric: "8",
    metricLabel: "active tools",
  },
  {
    title: "Session Lifecycle",
    description:
      "Redis HASH per session. CREATED → RUNNING → COMPLETED. Persistent conversation turns. Resume anywhere — Telegram, MC, API.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    accent: "amber",
  },
];

const accentColors = {
  emerald: {
    border: "group-hover:border-accent/30",
    text: "text-accent",
    bg: "bg-accent/10",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(110,231,183,0.2)]",
  },
  amber: {
    border: "group-hover:border-amber/30",
    text: "text-amber",
    bg: "bg-amber/10",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(252,211,77,0.2)]",
  },
  purple: {
    border: "group-hover:border-purple-400/30",
    text: "text-purple-400",
    bg: "bg-purple-400/10",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(167,139,250,0.2)]",
  },
  red: {
    border: "group-hover:border-red-400/30",
    text: "text-red-400",
    bg: "bg-red-400/10",
    glow: "group-hover:shadow-[0_0_40px_-10px_rgba(248,113,113,0.2)]",
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export default function Features() {
  return (
    <section id="features" className="py-32 relative mesh-gradient">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
          >
            Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl lg:text-5xl font-bold"
          >
            Built for Autonomy
          </motion.h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((f) => {
            const colors = accentColors[f.accent];
            return (
              <motion.div
                key={f.title}
                variants={item}
                className={`group bento-card p-7 ${colors.border} ${colors.glow} transition-all duration-500 ${f.span || ""}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}
                  >
                    <svg
                      className={`w-5 h-5 ${colors.text}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                    </svg>
                  </div>
                  {f.metric && (
                    <div className="text-right">
                      <div className={`font-display text-2xl font-bold ${colors.text}`}>
                        {f.metric}
                      </div>
                      <div className="text-xs text-muted font-mono">{f.metricLabel}</div>
                    </div>
                  )}
                </div>

                <h3 className="font-display text-lg font-semibold text-text-primary mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
