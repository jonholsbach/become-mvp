import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mbn: {
          bg: "#050914",
          "bg-alt": "#07111F",
          panel: "#0B1628",
          navy: "#06142E",
          white: "#F5FAFF",
          steel: "#AAB7C4",
          "steel-dim": "#7A8794",
        },
        electric: {
          primary: "#00AEEF",
          bright: "#12D8FF",
          glow: "#2F80FF",
        },
        fog: {
          mist: "#8BA4B8",
          deep: "#3D5266",
          veil: "#1A2838",
        },
        wilderness: {
          forest: "#0B281C",
          mountain: "#1A2A3A",
          river: "#0A3D4A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        "glow-radial":
          "radial-gradient(ellipse at center, rgba(47, 128, 255, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(47, 128, 255, 0.15), 0 0 80px rgba(0, 174, 239, 0.08)",
        "glow-sm": "0 0 20px rgba(18, 216, 255, 0.12)",
      },
      keyframes: {
        "fog-drift": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(2%)" },
        },
        "fog-roll": {
          "0%, 100%": { transform: "translateX(0) scale(1)" },
          "50%": { transform: "translateX(3%) scale(1.02)" },
        },
        "fog-roll-slow": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-2%)" },
        },
        "signal-flow": {
          "0%": { strokeDashoffset: "100" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fog-drift": "fog-drift 20s ease-in-out infinite",
        "fog-roll": "fog-roll 25s ease-in-out infinite",
        "fog-roll-slow": "fog-roll-slow 35s ease-in-out infinite",
        "signal-flow": "signal-flow 8s linear infinite",
        "signal-flow-delayed": "signal-flow 12s linear infinite 2s",
      },
    },
  },
  plugins: [],
};

export default config;
