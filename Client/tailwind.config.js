/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        aguafina: ["'Aguafina Script'", "cursive"],
        mozilla: ['"Mozilla Headline"', 'sans-serif']
      }
    },
  },
  plugins: [],
}

