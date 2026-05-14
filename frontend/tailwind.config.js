export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Playfair Display", "serif"]
      },
      colors: {
        ink: "#101828",
        aura: "#7c3aed",
        coral: "#fb7185",
        mint: "#2dd4bf",
        sun: "#f59e0b"
      },
      boxShadow: {
        glow: "0 20px 80px rgba(124, 58, 237, 0.28)",
        glass: "0 24px 80px rgba(15, 23, 42, 0.18)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s linear infinite",
        blob: "blob 12s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        },
        blob: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.08)" },
          "66%": { transform: "translate(-24px, 24px) scale(0.96)" }
        }
      }
    }
  },
  plugins: []
};
