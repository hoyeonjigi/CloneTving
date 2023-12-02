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

      brightness: ["hover", "focus"], // 이 부분을 추가합니다.
			colors: {
        brand: '#FF153C',
      },
    },
  },
  plugins: [],
};
