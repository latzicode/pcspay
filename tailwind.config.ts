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
        primary: "#FF6B2C", // Orange vif
        secondary: "#1E293B", // Bleu foncé
        accent: "#FFD700", // Or
        background: {
          DEFAULT: "#0F172A", // Fond très sombre
          light: "#1E293B", // Fond un peu plus clair
        },
        text: {
          DEFAULT: "#F8FAFC", // Texte clair
          muted: "#94A3B8", // Texte atténué
        }
      },
    },
  },
  darkMode: "class",
};

export default config;