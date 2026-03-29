import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#07080A",
        surface: "#0D0F12",
        "surface-raised": "#141720",
        "surface-hover": "#1A1E28",
        accent: "#6EE7B7",
        "accent-dim": "#34D399",
        amber: "#FCD34D",
        "amber-dim": "#F59E0B",
        muted: "#6B7280",
        "text-primary": "#F3F4F6",
        "text-secondary": "#9CA3AF",
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "grid-fade": "gridFade 3s ease-in-out infinite alternate",
        "orbit": "orbit 20s linear infinite",
        "scan": "scan 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { opacity: "0.4" },
          "100%": { opacity: "1" },
        },
        gridFade: {
          "0%": { opacity: "0.03" },
          "100%": { opacity: "0.08" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
        scan: {
          "0%, 100%": { transform: "translateY(-100%)", opacity: "0" },
          "50%": { transform: "translateY(100%)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
