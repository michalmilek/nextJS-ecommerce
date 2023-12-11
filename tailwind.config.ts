import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        raleway: ["var(--font-raleway)", ...fontFamily.sans],
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(180.96deg, #1F2937 0.82%, #8E8C80 129.1%)",
        "primary-gradient-reversed":
          "linear-gradient(180deg, #8E8C80 0.82%, #1F2937 129.1%)",
      },
      colors: {
        primary: {
          light: "#FCC182",
          DEFAULT: "#FA9021",
          dark: "#AF5B04",
          bgColor: "#94bbe9",
          superLight: "#8E8C80",
        },
      },
    },
  },
  plugins: [],
};
export default config;
