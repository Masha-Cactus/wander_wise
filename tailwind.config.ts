import type { Config } from "tailwindcss";

const config: Config = {
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
        gray100: "#202020",
        gray80: "#373737",
        gray70: "#666666",
        gray50: "#959595",
        gray30: "#959595",
        gray20: "#DADADA",
        gray10: "#E9E9E9",
        gray5: "#F5F5F5",
        white: "#F9F9F9",

        error: "#E41E1E",
        info: "#009EE2",
        warning: "FFDD2A",
        success: "#1DD000",
      },
      backgroundImage: {
        start_1: "url('/imges/start_1.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
