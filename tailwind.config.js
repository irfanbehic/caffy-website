/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand — pulled directly from the app's Color+Caffy.swift
        accent: { DEFAULT: "#FF6600", light: "#FF8533" },
        navy: { DEFAULT: "#1C1B4B", deep: "#15143A", soft: "#2A2A6E" },
        caffeine: {
          green: "#00C48C",
          yellow: "#FFB800",
          orange: "#FF6600",
          red: "#FF4757",
          blue: "#00B4D8",
        },
        detox: "#A78BFA",
        amber: "#F59E0B",
        // Adaptive surfaces (mirrors the app)
        ink: { DEFAULT: "#0C0C0E", soft: "#3C3C4F", faint: "#8A8A9E" },
        paper: { DEFAULT: "#F5F5F7", surface: "#FFFFFF", card: "#FAFAFA", line: "#E2E2E8" },
        night: { DEFAULT: "#0A0A0B", surface: "#1A1A1C", card: "#141416", line: "#2A2A2E" },
      },
      fontFamily: {
        // System-font stack (no web-font download). Matches the working Cloudflare
        // build: iOS uses SF Pro instantly — no font fetch, no FOIT, no swap reflow
        // (which caused the "loads half, then pops in and jumps" on mobile).
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Roboto",
          "system-ui",
          "Inter",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.03em",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(12,12,14,0.04), 0 8px 30px rgba(12,12,14,0.06)",
        lift: "0 20px 60px -20px rgba(12,12,14,0.25)",
        glow: "0 0 0 1px rgba(255,102,0,0.18), 0 18px 50px -12px rgba(255,102,0,0.35)",
      },
      keyframes: {
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "30%": { opacity: "0.7" },
          "100%": { transform: "translateY(-22px) scaleX(1.4)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        steam: "steam 3.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
