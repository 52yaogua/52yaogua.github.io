import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serifBrand: ['"Crimson Pro"', '"Songti SC"', ...defaultTheme.fontFamily.serif],
        sansBrand: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ink: '#05060a',
        obsidian: '#0f1014',
        sand: '#f8f1e7',
        gold: '#f5c979',
        jade: '#2dd4bf',
        ember: '#ea580c',
        dusk: '#312e81',
      },
      boxShadow: {
        oracle: '0 25px 60px -35px rgba(5, 6, 10, 0.95)',
      },
      backgroundImage: {
        'yijing-grid': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
        'yijing-aurora': 'conic-gradient(from 45deg, rgba(248,241,231,0.12), rgba(14,165,233,0.08), rgba(248,241,231,0.12))',
      },
    },
  },
  plugins: [],
}

