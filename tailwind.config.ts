import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0D2137',
          'navy-dark': '#081525',
          'navy-light': '#E8F4FD',
          cyan: '#00B4D8',
          'cyan-dark': '#0096C7',
          'cyan-light': '#E0F4FF',
          emerald: '#10B981',
          'emerald-light': '#D1FAE5',
          amber: '#F59E0B',
          'amber-light': '#FEF3C7',
          'amber-dark': '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
