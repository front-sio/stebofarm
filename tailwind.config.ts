// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#FFD700", // Yellow
        secondary: "#000000", // Black
        red: "#FF0000", // Black
        accent: "#FFFFFF", // White
      },

      fontFamily: {
        sans: ['"Poppins"', "sans-serif"], // Use Poppins or any preferred font
      },
    },
  },
  plugins: [],
};
