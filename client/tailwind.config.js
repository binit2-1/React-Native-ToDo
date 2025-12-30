const { hairlineWidth } = require('nativewind/theme');
 
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        'google-sans-flex-9pt-black': ['GoogleSansFlex_9pt-Black'],
        'google-sans-flex-9pt-bold': ['GoogleSansFlex_9pt-Bold'],
        'google-sans-flex-9pt-extrabold': ['GoogleSansFlex_9pt-ExtraBold'],
        'google-sans-flex-9pt-extralight': ['GoogleSansFlex_9pt-ExtraLight'],
        'google-sans-flex-9pt-light': ['GoogleSansFlex_9pt-Light'],
        'google-sans-flex-9pt-medium': ['GoogleSansFlex_9pt-Medium'],
        'google-sans-flex-9pt-regular': ['GoogleSansFlex_9pt-Regular'],
        'google-sans-flex-9pt-semibold': ['GoogleSansFlex_9pt-SemiBold'],
        'google-sans-flex-9pt-thin': ['GoogleSansFlex_9pt-Thin'],

        'google-sans-flex-24pt-black': ['GoogleSansFlex_24pt-Black'],
        'google-sans-flex-24pt-bold': ['GoogleSansFlex_24pt-Bold'],
        'google-sans-flex-24pt-extrabold': ['GoogleSansFlex_24pt-ExtraBold'],
        'google-sans-flex-24pt-extralight': ['GoogleSansFlex_24pt-ExtraLight'],
        'google-sans-flex-24pt-light': ['GoogleSansFlex_24pt-Light'],
        'google-sans-flex-24pt-medium': ['GoogleSansFlex_24pt-Medium'],
        'google-sans-flex-24pt-regular': ['GoogleSansFlex_24pt-Regular'],
        'google-sans-flex-24pt-semibold': ['GoogleSansFlex_24pt-SemiBold'],
        'google-sans-flex-24pt-thin': ['GoogleSansFlex_24pt-Thin'],

        'google-sans-flex-36pt-black': ['GoogleSansFlex_36pt-Black'],
        'google-sans-flex-36pt-bold': ['GoogleSansFlex_36pt-Bold'],
        'google-sans-flex-36pt-extrabold': ['GoogleSansFlex_36pt-ExtraBold'],
        'google-sans-flex-36pt-extralight': ['GoogleSansFlex_36pt-ExtraLight'],
        'google-sans-flex-36pt-light': ['GoogleSansFlex_36pt-Light'],
        'google-sans-flex-36pt-medium': ['GoogleSansFlex_36pt-Medium'],
        'google-sans-flex-36pt-regular': ['GoogleSansFlex_36pt-Regular'],
        'google-sans-flex-36pt-semibold': ['GoogleSansFlex_36pt-SemiBold'],
        'google-sans-flex-36pt-thin': ['GoogleSansFlex_36pt-Thin'],

        'google-sans-flex-72pt-black': ['GoogleSansFlex_72pt-Black'],
        'google-sans-flex-72pt-bold': ['GoogleSansFlex_72pt-Bold'],
        'google-sans-flex-72pt-extrabold': ['GoogleSansFlex_72pt-ExtraBold'],
        'google-sans-flex-72pt-extralight': ['GoogleSansFlex_72pt-ExtraLight'],
        'google-sans-flex-72pt-light': ['GoogleSansFlex_72pt-Light'],
        'google-sans-flex-72pt-medium': ['GoogleSansFlex_72pt-Medium'],
        'google-sans-flex-72pt-regular': ['GoogleSansFlex_72pt-Regular'],
        'google-sans-flex-72pt-semibold': ['GoogleSansFlex_72pt-SemiBold'],
        'google-sans-flex-72pt-thin': ['GoogleSansFlex_72pt-Thin'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};