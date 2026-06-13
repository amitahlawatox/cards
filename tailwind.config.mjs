/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', 'sans-serif'],
      },
      animation: {
        float:        'float 4s ease-in-out infinite',
        'float-slow': 'float 7s ease-in-out infinite',
        shimmer:      'shimmer 2.2s linear infinite',
        'gradient-x': 'gradient-x 5s ease infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200%',
        '300%': '300% 300%',
      },
    },
  },
  plugins: [],
};
