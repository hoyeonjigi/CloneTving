/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.js", "./src/**/*.jsx", "./src/*.jsx"],
  theme: {
    extend: {
      // fontFamily: {
      // 	pre: ["Pretendard", "sans-serif"],
      // 	welcome: ["Baloo Bhai 2", "sans-serif"],
      // },
      fontFamily: {
        pre: ["Pretendard", "sans-serif"],
        baloo: ['"Baloo Bhai 2"', "sans-serif"],
        noto: ["Noto Sans KR", "sans-serif"],
      },

      brightness: ["hover", "focus"],

      colors: {
        brand: "#FF153C",
        onboard: "#DEDEDE",
      },
      fontSize: {
        "1.5xl": ["1.3rem", "1.75rem"],
        "2.5xl": ["1.75rem", "2.25rem"], // 원하는 크기로 조정 가능
        "4.5xl": ["2.85rem", "3rem"],
      },
    },
  },

  variants: {
    extend: {
      filter: ["hover", "focus"], // 추가
    },
  },
  plugins: [],
};
