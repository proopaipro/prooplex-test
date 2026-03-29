"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}

const STATS: Stat[] = [
  { value: 14, suffix: "", label: "Platform modules", prefix: "" },
  { value: 97, suffix: "/97", label: "Routing accuracy", prefix: "" },
  { value: 8, suffix: "", label: "Active tools per agent", prefix: "" },
  { value: 3, suffix: "", label: "Memory tiers (Redis)", prefix: "" },
  { value: 25, suffix: "+", label: "Talk events streamed", prefix: "" },
  { value: 0.39, suffix: "", label: "Avg cost per task (USD)", prefix: "$" },
];

function AnimatedNumber({
  value,
  suffix,
  prefix,
  inView,
}: {
  value: number;
  suffix: string;
  prefix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }

    const isFloat = value % 1 !== 0;
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(isFloat ? parseFloat((value * eased).toFixed(2)) : Math.round(value * eased));
      if (current >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [inView, value]);

  return (
    <span className="font-display text-4xl lg:text-5xl font-extrabold">
      {prefix}
      {value % 1 !== 0 ? display.toFixed(2) : display}
      <span className="text-muted">{suffix}</span>
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-void via-surface to-void" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center lg:text-left"
            >
              <div className="text-accent">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  inView={inView}
                />
              </div>
              <div className="mt-2 text-sm text-text-secondary font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
