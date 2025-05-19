import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textChat: "var(--chat-text)",
        MainBgOne: "var(--main-bg-one)",
        MainBgTwo: "var(--main-bg-two)",
        MainBgThree: "var(--main-bg-three)",
        MainTextOne: "var(--main-text-one)",
        MainTextTwo: "var(--main-text-two)",
      },
    },
    // fontFamily: {
    //   IranYekanThin: ["IranYekanThin", "sans-serif"],
    //   IranYekanUltraLight: ["IranYekanUltraLight", "sans-serif"],
    //   IranYekanLight: ["IranYekanLight", "sans-serif"],
    //   IranYekanRegular: ["IranYekanRegular", "sans-serif"],
    //   IranYekanMedium: ["IranYekanMedium", "sans-serif"],
    //   IranYekanDemiBold: ["IranYekanDemiBold", "sans-serif"],
    //   IranYekanBold: ["IranYekanBold", "sans-serif"],
    //   IranYekanBlack: ["IranYekanBlack", "sans-serif"],
    //   IranYekanExtraBold: ["IranYekanExtraBold", "sans-serif"],
    //   IranYekanExtraBlack: ["IranYekanExtraBlack", "sans-serif"],
    //   IranYekanHeavy: ["IranYekanHeavy", "sans-serif"],
    // },
    fontFamily: {
      YekanBakhFaNum: ["YekanBakhFaNum", "sans-serif"],
      main: ["var(--font-main)"],
    },
  },
  plugins: [],
});
export default config;
