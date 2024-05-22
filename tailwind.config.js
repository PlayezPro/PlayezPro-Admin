/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#32332D',
        'custom-white': '#F2F2F2',
        'primary': '#E7FF0D',
        'secondary': '#BBBF39',
      },
      'body':'#32332D'
    },
  },
  plugins: [],
}