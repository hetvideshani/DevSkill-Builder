import type { Config } from "tailwindcss";
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        'custom-purple':'#7341e8',
        'custom-pink': '#f778ba',
        'custom-green': '#3fb950',
        'custom-blue': '#33b3ae',
        'custom-gray': '#26262a',
        'custom-white': '#e1e1e1',
        'custom-gray2': '#262626',
        'custom-gray3':'#333333',
        'custom-dark-gray':'#1d1d1d'
      },
      keyframes: {
        moveUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
      animation: {
        moveUp: 'moveUp 5s linear infinite',
        spotlight: "spotlight 2s ease .75s 1 forwards",
      }
    },
  },
  darkMode: 'class',
  plugins: [
    addVariablesForColors,
  ],
};
// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
