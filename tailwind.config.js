/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', 'sans-serif'],
        display: ['PP Formula', 'sans-serif'],
        tag: ['IBM Plex Mono', 'monospace'],
      },
      screens: {
        xs: { raw: '(min-width: 425px)' },
        big: { raw: '(min-width: 990px)' },
        '3xl': { raw: '(min-width: 2080px)' }, //  Expecially useful for grid decorators
      },
      spacing: {
        square: 'var(--square-size)',
        squareContainer: 'calc(var(--square-size) * 3)',
        navHeight: 'var(--navbar-height)',
      },
      colors: {
        //Old Colors - comment them out gradually
        superWhite: 'white',
        white: '#FAFAFA',
        whiteAlt: `#F2F2F2`,
        pureBlack: '#000',
        black: '#111',
        // backgroundDark: `#090a0f`,
        backgroundLight: `#1A1F1F`,
        text: '#ecf0f1',
        textDark: '#2c3e50',
        dullViolet: '#79528c',
        lightViolet: '#efcfff',
        // violet: '#9000D5',
        purple: '#590BB2',
        //Blog Article Colors
        infoYellow: '#fff7d8',
        infoYellowBorder: '#e9e0bd',
        //Redesign Colors
        green: {
          400: '#6DDA84',
          DEFAULT: '#6DDA84',
        },
        grey: {
          100: '#DFE0E2',
          200: '#A2A5AE',
          400: '#666B7B',
          700: '#232837',
          800: '#1D2230',
          900: '#131825',
          DEFAULT: '#666B7B',
        },
        violet: {
          400: '#7313EB',
          DEFAULT: '#7313EB',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        fadeIn: {
          '0%,100%': {
            opacity: 0,
          },
          '25%,75%': {
            opacity: 1,
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        fadeIn: 'fadeIn 3.1s ease-in-out',
      },
      backgroundImage: {
        '3d-grid': "url('/svg/3DGrid.svg')",
      },
      zIndex: {
        contentLayer: 5,
        decoration: 3,
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
