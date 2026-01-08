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
        // Dark theme colors matching mobile app
        dark: {
          bg1: '#0F1012',
          bg2: '#15171A',
          bg3: '#1C1F23',
          text: '#EDEDEF',
          textMuted: '#A3A6AD',
          border: '#2A2E33',
        },
        // Light theme colors
        light: {
          bg1: '#F7F7F8',
          bg2: '#FFFFFF',
          bg3: '#F1F1F3',
          text: '#1F1F22',
          textMuted: '#6B6B72',
          border: '#E5E5E9',
        },
        // Accent colors
        accent: {
          primary: '#F06565',
          primaryLight: '#D04747',
          primaryMuted: '#6A2D2D',
          orange: '#FF6B47', // Coral/orange from logo
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

