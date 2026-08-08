/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'inter-regular': ['Inter_400Regular'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
        'archivo-regular': ['Archivo_400Regular'],
        'archivo-medium': ['Archivo_500Medium'],
        'archivo-semibold': ['Archivo_600SemiBold'],
        'archivo-bold': ['Archivo_700Bold']
      },
      colors: {
        brand: {
          light: '#42D59E',
          main: '#2CBA80',
          dark: '#13915D'
        },
        grays: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        }
      }
    }
  },
  plugins: []
};
