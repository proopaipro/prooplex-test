"use client";

import { motion } from "framer-motion";

const LAYERS = [
  {
    name: "Ingress",
    items: ["Telegram Bot", "Mission Control", "REST API", "Webhook"],
    color: "accent",
  },
  {
    name: "Gateway",
    items: ["Message Router", "Session Manager", "Context Builder", "Event Bus"],
    color: "accent-dim",
  },
  {
    name: "Execution",
    items: ["Claude CLI", "Tool Registry", "Agent Executor", "Spawn Manager"],
    color: "amber",
  },
  {
    name: "Intelligence",
    items: ["Contract Evaluator", "Self-Learner", "Routing Learner", "Memory Writer"],
    color: "amber-dim",
  },
  {
    name: "Persistence",
    items: ["Redis Sessions", "Redis Memory", "Redis Contracts", "Redis Rules"],
    color: "red-400",
  },
];

export default function Architecture() {
  return (
    <section id="architecture" className="py-32 relative">
      {/* Subtle vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-amber font-mono text-sm tracking-widest uppercase mb-4"
          >
            Under the Hood
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl lg:text-5xl font-bold"
          >
            5-Layer Stack
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-text-secondary max-w-lg mx-auto"
          >
            Each layer is protocol-based and pluggable. Replace any component
            without touching the rest.
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {LAYERS.map((layer, i) => (
            <motion.div
              key={layer.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bento-card p-6 relative overflow-hidden group"
            >
              {/* Layer number */}
              <div className="absolute top-4 right-5 font-display text-6xl font-extrabold text-white/[0.02] group-hover:text-white/[0.04] transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-3 h-3 rounded-full bg-${layer.color}`}
                  style={{
                    backgroundColor:
                      layer.color === "accent"
                        ? "#6EE7B7"
                        : layer.color === "accent-dim"
                          ? "#34D399"
                          : layer.color === "amber"
                            ? "#FCD34D"
                            : layer.color === "amber-dim"
                              ? "#F59E0B"
                              : "#F87171",
                  }}
                />
                <h3 className="font-display text-xl font-bold">{layer.name}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs font-mono text-text-secondary group-hover:border-white/10 group-hover:text-text-primary transition-all duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
