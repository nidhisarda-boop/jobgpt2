/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Joblet Brand Palette
        brand: {
          red:   "#D42B2B",
          dark:  "#1A1A1A",
          cream: "#F5F0EC",
          tint:  "#F0EBEB",
          gray:  "#D5D5D5",
          mid:   "#999999",
        },
      },
      fontFamily: {
        sans:  ["InstrumentSans", "system-ui", "sans-serif"],
        serif: ["CrimsonPro", "Georgia", "serif"],
        mono:  ["GeistMono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
