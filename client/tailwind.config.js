/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#F8FAFC'
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [
      require('flowbite/plugin')
  ]
}
