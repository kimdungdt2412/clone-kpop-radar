/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'logo_1': "url('/src/assets/images/logo_1.svg')",
        'logo_gif': "url('/src/assets/images/logo_motion_1.gif')",
        'footer_blip': "url('/src/assets/images/kr-footer-blip-symbol.png')",
        'twitter_icon': "url('/src/assets/images/icon_sns_twitter.svg')",
        'youtube_icon': "url('/src/assets/images/icon_sns_youtube.svg')",
        'instagram_icon': "url('/src/assets/images/icon_sns_instagram.svg')"
      },
      backgroundSize: {
        '100': "100%"
      }
    },
  },
  plugins: [],
}
