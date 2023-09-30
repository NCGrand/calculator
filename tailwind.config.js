/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': 'minmax(7rem, auto) repeat(5, 6rem)',
      },
    },
  },
  plugins: [],
}

