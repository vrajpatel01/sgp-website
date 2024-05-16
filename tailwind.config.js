/** @type {import('tailwindcss').Config} */
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
      colors: {
        "primary": "#035FAA",
        "secondary": "#FE4500",
        "background": "#FFFFFF",
        "secondary-background": "#F7F8F9",
        "primary-text": "#101116",
        "secondary-text": "#FFFFFF",
        "border": "#D2D2D2"
      },
      fontFamily: {
        "sf-regular": "sf-regular",
        "sf-bold": "sf-bold",
        "sf-blackitalic": "sf-blackitalic",
        "sf-bolditalic": "sf-bolditalic",
        "sf-medium": "sf-medium",
        "sf-lightitalic": "sf-lightitalic",
      },
      fontSize: {
        "display-80": "80px",
        "display-72": "72px",
        "display-60": "60px",
        "main-42": "42px",
        "main-38": "36px",
        "main-32": "32px",
        "title-28": "28px",
        "title-24": "24px",
        "subtitle-18": "18px",
        "body-18": "18px",
        "body-16": "16px",
        "detail-14": "14px",
        "small-12": "12px",
      },
      borderWidth: {
        1: "1px",
      }
    },
  },
  plugins: [],
};
