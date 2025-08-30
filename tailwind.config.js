/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées BT Conseil si besoin
        'bt-blue': {
          700: '#1d4ed8', // Votre bleu roi
          800: '#1e40af',
        }
      },
    },
  },
  plugins: [],
};