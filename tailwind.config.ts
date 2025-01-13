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
        primary: {
          DEFAULT: "#D4B78F",
          light: "#FFC078",
          dark: "#B89F7A",
        },
        accent: {
          DEFAULT: "#F8D7E5",
          light: "#FFE4EC",
          dark: "#E6CCB2",
        },
        background: {
          DEFAULT: "#FDFBF7",
          light: "#FFFFFF",
          dark: "#2D2016",
        },
        text: {
          DEFAULT: "#2D2016",
          muted: "#766E66",
          light: "#998E87",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui"],
        display: ["var(--font-montserrat)", "system-ui"],
      },
      fontSize: {
        h1: ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h2: ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        h3: ['1.5rem', { lineHeight: '1.4' }],
        body: ['1.125rem', { lineHeight: '1.6' }],
        small: ['0.875rem', { lineHeight: '1.5' }],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'fade-up': 'fadeUp 0.5s ease-out',
        'breathe': 'breathe 4s ease-in-out infinite',
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '1' },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        }
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, var(--tw-colors-primary-light), var(--tw-colors-primary), var(--tw-colors-primary-dark))',
        'gradient-soft': 'linear-gradient(135deg, var(--tw-colors-accent-light), var(--tw-colors-accent))',
        'shimmer-gold': 'linear-gradient(90deg, transparent, rgba(255,192,120,0.1), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;