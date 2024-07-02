import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        maven: "var(--font-maven)",
      },
      colors: {
        yellow: "#FFC015",
        black: "#080808",
        gray: {
          5: "#F5F5F5",
          10: "#E9E9E9",
          20: "#DADADA",
          30: "#C1C1C1",
          50: "#959595",
          70: "#666666",
          80: "#373737",
          100: "#1C1C1C",
        },
        white: "#F9F9F9",
        error: "#E41E1E",
        info: "#009EE2",
        warning: "FFDD2A",
        success: "#1DD000",
      },

      fontSize: {
        xs: ['12px', '18px'],
        sm: ['14px', '21px'],
        base: ['16px', '24px'],
        xl: ['20px', '30px'],
        "2xl": ['24px', '36px'],
        "3xl": ['28px', '42px'],
        "4xl": ['32px', '48px'],
        "5xl": ['40px', '60px'],
        "7xl": ['70px', '84px'],
        "8xl": ['120px', '126px'],
      },

      keyframes: {
        spin: {
          "0%": {transform: "scale(1) rotate(0)"},
          "20%": {transform: "scale(1.3) rotate(90deg)"},
          "25%": {transform: "scale(1.3) rotate(90deg)"},
          "45%": {transform: "scale(1) rotate(180deg)"},
          "50%": {transform: "scale(1) rotate(180deg)"},
          "70%": {transform: "scale(1.3) rotate(270deg)"},
          "75%": {transform: "scale(1.3) rotate(270deg)"},
          "95%": {transform: "scale(1) rotate(360deg)"},
          "100%": {transform: "scale(1) rotate(360deg)"},
        }
      },
      animation: {
        "loader-spin": "spin 3s linear infinite",
      }
    },
  },
  plugins: [],
};

export default config;
