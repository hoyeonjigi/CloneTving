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
			},
		},
	},
	plugins: [],
};
