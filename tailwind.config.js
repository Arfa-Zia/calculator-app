/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      colors:{
        'shade-1': '#A0D7FF',
        'shade-2': '#109DFF',
        'shade-3': '#005DB2',
      },
      fontFamily:{
        poppins: ['Poppins',...defaultTheme.fontFamily.sans],
      },

    },
  },
  plugins: [],
}

