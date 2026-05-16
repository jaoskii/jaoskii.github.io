/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        bg: {
          primary: "#0d0f17",   // near-black with faint purple (EVA shadow)
          secondary: "#13101e", // deep purple-dark
          card: "#1a1628",      // EVA purple-tinted card
          hover: "#221d32",     // purple hover
        },
        accent: {
          DEFAULT: "#c084fc",               // EVA Unit-01 bright violet
          dim: "#f97316",                   // EVA orange trim — shows on hover
          muted: "rgba(192,132,252,0.1)",
          orange: "#f97316",                // EVA shoulder pad orange
          green: "#4ade80",                 // EVA eye / sensor green
        },
        border: {
          DEFAULT: "#30283f",   // purple-tinted border
          light: "#3d3454",     // lighter purple border
        },
        text: {
          primary: "#e6edf3",
          secondary: "#8b949e",
          muted: "#6e7681",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-right": "slideRight 0.5s ease forwards",
        blink: "blink 1s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideRight: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
