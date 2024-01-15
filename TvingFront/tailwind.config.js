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
        btnText: "#A3A3A3",
        btnBorder: "#4e4e4e",

        gray_01: "#191919",
        gray_02: "#212121",
        gray_03: "#2e2e2e",
        gray_04: "#4e4e4e",
        gray_05: "#6e6e6e",
        gray_06: "#888888",
        gray_07: "#a3a3a3",
        gray_08: "#dedede",
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
