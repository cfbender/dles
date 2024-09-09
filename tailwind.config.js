/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: 'rgb(48, 52, 70)',
        surface0: 'rgb(65, 69, 89)',
        surface1: 'rgb(81, 87, 109)',
        surface2: 'rgb(98, 104, 128)',
        text: 'rgb(198, 208, 245)',
        subtext: 'rgb(181, 191, 226)',
        subtext1: 'rgb(165, 173, 206)',
        rosewater: 'rgb(242, 213, 207)',
        sapphire: 'rgb(133, 193, 220)',
        lavender: 'rgb(186, 187, 241)',
      },
    },
  },
  plugins: [],
}
