import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      gridTemplateColumns: {
        display: 'repeat(4, minmax(13.75rem, 1fr))',
      },
      backgroundColor: {
        dark: {
          100: '#313131',
          200: '#3A3A3A',
          300: '#1d1d1d',
          400: '#282828',
          900: '#202024',
        },
        ocean: {
          700: '#1F78FF',
        },
      },
      borderColor: {
        dark: {
          100: '#313131',
        },
        ocean: {
          700: '#1F78FF',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
