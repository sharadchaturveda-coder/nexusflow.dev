/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': '#FFFDF9',
        'eggshell': '#F9F6F2',
        'gold': '#ffba08',
        'goldenrod': '#f59e0b',
        'magenta': '#ff5c8a',
        'orange': '#ff914d',
        'blush': '#fef2f2',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(45deg, #FFD700, #FFB300)',
        'candy-gradient': 'linear-gradient(to right, #E10098, #FF5722, #FFD700)',
        'orange-fade': 'linear-gradient(to bottom, #FFEEEA, #FFFDF9)',
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        marquee: 'marquee 60s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
