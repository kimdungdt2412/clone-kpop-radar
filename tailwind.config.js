/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'logo_1': "url('/src/assets/images/logo_1.svg')",
        'logo_gif': "url('/src/assets/images/logo_motion_1.gif')"
      },
      backgroundSize: {
        '100': "100%"
      }
    },
  },
  plugins: [],
}
