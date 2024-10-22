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
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#cbd4c2",
        sub: "#e7ebe3",
        font_main: "#222222",
        font_sub: "#828584",
        font_btn: "#5e6c45",
        bg: "#f3f4f6",
        border: "#556B2F",
      },
    },
  },
  plugins: [],
};
export default config;
