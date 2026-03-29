"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

interface AgentNode {
  id: string;
  label: string;
  x: number;
  y: number;
  radius: number;
  color: string;
  glowColor: string;
  active: boolean;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
  progress: number;
}

const AGENTS: AgentNode[] = [
  { id: "gateway", label: "Gateway", x: 400, y: 80, radius: 28, color: "#6EE7B7", glowColor: "rgba(110,231,183,0.3)", active: true },
  { id: "router", label: "Router", x: 400, y: 200, radius: 22, color: "#6EE7B7", glowColor: "rgba(110,231,183,0.2)", active: false },
  { id: "ceo", label: "CEO", x: 250, y: 300, radius: 24, color: "#FCD34D", glowColor: "rgba(252,211,77,0.25)", active: false },
  { id: "coder", label: "Coder", x: 150, y: 420, radius: 20, color: "#6EE7B7", glowColor: "rgba(110,231,183,0.2)", active: false },
  { id: "research", label: "Research", x: 350, y: 420, radius: 20, color: "#6EE7B7", glowColor: "rgba(110,231,183,0.2)", active: false },
  { id: "tester", label: "Tester", x: 550, y: 300, radius: 20, color: "#6EE7B7", glowColor: "rgba(110,231,183,0.2)", active: false },
  { id: "memory", label: "Memory", x: 600, y: 180, radius: 18, color: "#34D399", glowColor: "rgba(52,211,153,0.2)", active: false },
  { id: "redis", label: "Redis", x: 680, y: 300, radius: 16, color: "#F87171", glowColor: "rgba(248,113,113,0.2)", active: false },
  { id: "eval", label: "Evaluator", x: 550, y: 420, radius: 18, color: "#FCD34D", glowColor: "rgba(252,211,77,0.2)", active: false },
  { id: "learner", label: "Learner", x: 680, y: 420, radius: 16, color: "#A78BFA", glowColor: "rgba(167,139,250,0.2)", active: false },
];

const BASE_CONNECTIONS: Omit<Connection, "active" | "progress">[] = [
  { from: "gateway", to: "router" },
  { from: "router", to: "ceo" },
  { from: "router", to: "tester" },
  { from: "ceo", to: "coder" },
  { from: "ceo", to: "research" },
  { from: "router", to: "memory" },
  { from: "memory", to: "redis" },
  { from: "tester", to: "eval" },
  { from: "eval", to: "learner" },
  { from: "learner", to: "redis" },
];

const ACTIVATION_SEQUENCE = [
  ["gateway"],
  ["router"],
  ["ceo", "memory"],
  ["coder", "tester", "redis"],
  ["research", "eval"],
  ["learner"],
];

export default function NerveCenter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [agents, setAgents] = useState<AgentNode[]>(AGENTS);
  const [connections, setConnections] = useState<Connection[]>(
    BASE_CONNECTIONS.map((c) => ({ ...c, active: false, progress: 0 }))
  );
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!isInView) {
      setStep(-1);
      setAgents(AGENTS.map((a) => ({ ...a, active: false })));
      setConnections(
        BASE_CONNECTIONS.map((c) => ({ ...c, active: false, progress: 0 }))
      );
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      if (current >= ACTIVATION_SEQUENCE.length) {
        // Reset after a pause
        setTimeout(() => {
          setStep(-1);
          setAgents(AGENTS.map((a) => ({ ...a, active: false })));
          setConnections(
            BASE_CONNECTIONS.map((c) => ({ ...c, active: false, progress: 0 }))
          );
          current = 0;
        }, 2000);
        clearInterval(interval);
        return;
      }

      const activating = ACTIVATION_SEQUENCE[current];
      setStep(current);
      setAgents((prev) =>
        prev.map((a) => ({
          ...a,
          active: a.active || activating.includes(a.id),
        }))
      );
      setConnections((prev) =>
        prev.map((c) => ({
          ...c,
          active:
            c.active || activating.includes(c.from) || activating.includes(c.to),
          progress:
            c.active || activating.includes(c.from) || activating.includes(c.to)
              ? 1
              : 0,
        }))
      );
      current++;
    }, 800);

    return () => clearInterval(interval);
  }, [isInView]);

  const getNode = useCallback(
    (id: string) => agents.find((a) => a.id === id)!,
    [agents]
  );

  return (
    <section ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-mono text-sm tracking-widest uppercase mb-4"
          >
            Live Architecture
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-display text-4xl lg:text-5xl font-bold"
          >
            The Nerve Center
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-text-secondary max-w-xl mx-auto"
          >
            Watch messages flow through the system. Gateway routes. Agents
            execute. Memory persists. Contracts verify.
          </motion.p>
        </div>

        <div className="flex justify-center">
          <svg
            viewBox="0 0 800 500"
            className="w-full max-w-3xl"
            style={{ filter: "drop-shadow(0 0 40px rgba(110,231,183,0.05))" }}
          >
            {/* Connections */}
            {connections.map((conn, i) => {
              const from = getNode(conn.from);
              const to = getNode(conn.to);
              return (
                <g key={i}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={conn.active ? "rgba(110,231,183,0.3)" : "rgba(110,231,183,0.06)"}
                    strokeWidth={conn.active ? 2 : 1}
                    style={{ transition: "all 0.6s ease" }}
                  />
                  {/* Data packet traveling along the line */}
                  {conn.active && (
                    <circle r="3" fill="#6EE7B7">
                      <animateMotion
                        dur="1.5s"
                        repeatCount="indefinite"
                        path={`M${from.x},${from.y} L${to.x},${to.y}`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Agent nodes */}
            {agents.map((agent) => (
              <g key={agent.id}>
                {/* Glow */}
                {agent.active && (
                  <circle
                    cx={agent.x}
                    cy={agent.y}
                    r={agent.radius + 15}
                    fill={agent.glowColor}
                    style={{ transition: "all 0.6s ease" }}
                  >
                    <animate
                      attributeName="r"
                      values={`${agent.radius + 10};${agent.radius + 20};${agent.radius + 10}`}
                      dur="2s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.4;0.8;0.4"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                {/* Node circle */}
                <circle
                  cx={agent.x}
                  cy={agent.y}
                  r={agent.radius}
                  fill={agent.active ? "#0D0F12" : "#0A0B0D"}
                  stroke={agent.active ? agent.color : "rgba(110,231,183,0.1)"}
                  strokeWidth={agent.active ? 2 : 1}
                  style={{ transition: "all 0.6s ease" }}
                />
                {/* Label */}
                <text
                  x={agent.x}
                  y={agent.y + 4}
                  textAnchor="middle"
                  fill={agent.active ? "#F3F4F6" : "#6B7280"}
                  fontSize="10"
                  fontFamily="JetBrains Mono, monospace"
                  fontWeight="500"
                  style={{ transition: "fill 0.6s ease" }}
                >
                  {agent.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
}
