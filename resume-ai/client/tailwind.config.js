/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        serif: ["'Cormorant Garamond'", "serif"],
        mono: ["'Courier New'", "monospace"],
      },
      colors: {
        gold: {
          50:  "#fef8ee",
          100: "#fdefd3",
          300: "#f5d38a",
          400: "#d9b85c",
          500: "#c9a84c",
          600: "#a8882a",
          700: "#7c4a03",
          800: "#3d1f00",
        },
        dark: {
          50:  "#e2dfd8",
          100: "#c8c4bc",
          200: "#8090a8",
          300: "#6070a0",
          400: "#4a5060",
          500: "#3a4560",
          600: "#2a3040",
          700: "#1e2838",
          800: "#1a2030",
          900: "#101620",
          950: "#0c1118",
          975: "#0a0f18",
          1000:"#080c14",
        },
      },
      animation: {
        "fade-in":  "fadeIn .3s ease",
        "slide-in": "slideIn .25s ease",
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0, transform: "translateY(-4px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        slideIn: { from: { opacity: 0, transform: "translateX(16px)" }, to: { opacity: 1, transform: "translateX(0)" } },
      },
    },
  },
  plugins: [],
};
