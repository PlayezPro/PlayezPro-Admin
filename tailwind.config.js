module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#24272C',
        'custom-white': '#F2F2F2',
        'primary': '#E7FF0D',
        'secondary': '#BBBF39',
        'terciary': '#2A2D32',
      },
      backgroundImage: theme => ({
        'body-gradient': 'linear-gradient(to bottom, #24272C, #000000)',
      }),
      fontFamily: {
        'sans': ['Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
