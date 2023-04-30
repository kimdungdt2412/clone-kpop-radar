/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*", "./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'xs': { 'max': '639px' },
      'sm': { 'min': '640px', 'max': '767px' },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': { 'min': '768px', 'max': '1023px' },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': { 'min': '1024px' },
      // => @media (min-width: 1024px) { ... }

      'xl': { 'min': '1280px' },
      // => @media (min-width: 1280px) { ... }

      '2xl': { 'min': '1536px' },
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      backgroundImage: {
        'logo_1': "url('/src/assets/images/logo_1.png')",
        'logo_mini': "url('/src/assets/images/logo_mini.svg')",
        'logo_gif': "url('/src/assets/images/logo_motion_1.gif')",
        'logo_white': "url('/src/assets/images/logo_white.png')",
        'logo_white_gif': "url('/src/assets/images/logo_white_motion.gif')",
        'logo_white_mini': "url('/src/assets/images/logo_white_mini.svg')",
        'footer_blip': "url('/src/assets/images/kr-footer-blip-symbol.png')",
        'twitter_icon': "url('/src/assets/images/icon_sns_twitter.svg')",
        'youtube_icon': "url('/src/assets/images/icon_sns_youtube.svg')",
        'instagram_icon': "url('/src/assets/images/icon_sns_instagram.svg')",
        'about_bg_kv_m': "url('/src/assets/images/bg_kv_img_m.jpg')",
        'about_bg_kv': "url('/src/assets/images/bg_kv_img.jpg')",
        'icon_footer_logo': "url('/src/assets/images/icon_footer_logo.svg')",
        'img_kv_banner': "url('/src/assets/images/img_kv_banner.jpg')",
        'img_kv_banner_m': "url('/src/assets/images/img_kv_banner_m.jpg')",
        'icon_brief_close': "url('/src/assets/images/icon_brief_close.jpg')",
        'icon_brief_url': "url('/src/assets/images/icon_brief_url.jpg')",
        'ico_brief_moreblack': "url('/src/assets/images/ico_brief_moreblack.svg')",
        'ico_artist_arrow': "url('/src/assets/images/ico_artist_arrow.svg')"
      },
      backgroundSize: {
        '100': "100%"
      },
      fontFamily: {
        'noto': ["Noto Sans KR", "sans-serif"]
      },
      keyframes: {
        mmfadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        mmfadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        },
        mmslideIn: {
          '0%': { transform: 'translateY(15%)' },
          '100%': { transform: 'translateY(0)' }
        },
        mmslideOut: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-10%)' }
        },
      },
      animation: {
        mmfadeIn: 'mmfadeIn 0.3s ease-out',
        mmfadeOut: 'mmfadeOut 0.3s ease-out',
        mmslideIn: 'mmslideIn 0.3s ease-out',
        mmslideOut: 'mmslideOut 0.3s ease-out',
      }
    },
  },
plugins: [
  require('@tailwindcss/line-clamp')
],
}
