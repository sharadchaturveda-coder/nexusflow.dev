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
        'opal-white': '#F8F8F8', /* Explicit Opal White */
        'gold': {
          DEFAULT: '#FFD700', /* Base Gold */
          'light': '#FFEB3B',
          'dark': '#FFC107',
          'accent': '#FFA500', /* Orange-Gold Accent */
        },
        'magenta': '#ff5c8a',
        'orange': '#ff914d',
        'blush': '#fef2f2',
        'purple-dark': '#6A0DAD', /* For Flush Memory button */
        'purple-light': '#8A2BE2',
      },
      boxShadow: {
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)', /* Softer, more attractive shadow */
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.6)', /* For card borders */
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(45deg, var(--tw-colors-gold-DEFAULT), var(--tw-colors-gold-accent))',
        'candy-gradient': 'linear-gradient(to right, #E10098, #FF5722, #FFD700)',
        'orange-fade': 'linear-gradient(to bottom, #FFEEEA, #FFFDF9)',
        'purple-gradient': 'linear-gradient(to right, var(--tw-colors-purple-dark), var(--tw-colors-purple-light))',
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        marquee: 'marquee 60s linear infinite',
        'border-glow': 'borderGlow 2s infinite alternate', /* New animation for shimmering border */
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
        borderGlow: {
          '0%': { 'box-shadow': '0 0 5px rgba(255, 215, 0, 0.4)' },
          '100%': { 'box-shadow': '0 0 20px rgba(255, 215, 0, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
