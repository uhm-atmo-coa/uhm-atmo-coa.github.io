const brandTokens = require('./src/constants/brand-tokens.json');
const parseFontStack = (value) => value.split(',').map((part) => part.trim());

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          'manoa-green': brandTokens.palette.primary.manoaGreen,
          navy: brandTokens.palette.primary.deepNavy,
          midnight: brandTokens.palette.primary.midnightBlue,
          white: brandTokens.palette.primary.pureWhite,
          atmospheric: {
            teal: brandTokens.palette.atmospheric.teal,
            blue: brandTokens.palette.atmospheric.blue,
            ocean: brandTokens.palette.atmospheric.ocean,
            sky: brandTokens.palette.atmospheric.sky,
            aqua: brandTokens.palette.atmospheric.aqua,
          },
          environmental: {
            forest: brandTokens.palette.environmental.forest,
            valley: brandTokens.palette.environmental.valley,
          },
          solar: {
            gold: brandTokens.palette.solar.gold,
            'warm-sand': brandTokens.palette.solar.warmSand,
          },
          neutral: {
            slate: brandTokens.palette.neutral.slate,
            silver: brandTokens.palette.neutral.silver,
            cloud: brandTokens.palette.neutral.cloud,
          },
        },
      },
      fontFamily: {
        'brand-primary': parseFontStack(brandTokens.typography.fontFamily.primary),
        'brand-secondary': parseFontStack(brandTokens.typography.fontFamily.secondary),
      },
      fontSize: {
        'brand-sm': brandTokens.typography.fontSize.small,
        'brand-md': brandTokens.typography.fontSize.medium,
        'brand-lg': brandTokens.typography.fontSize.large,
        'brand-xl': brandTokens.typography.fontSize.xlarge,
      },
      fontWeight: {
        'brand-light': brandTokens.typography.fontWeight.light,
        'brand-regular': brandTokens.typography.fontWeight.regular,
        'brand-medium': brandTokens.typography.fontWeight.medium,
        'brand-bold': brandTokens.typography.fontWeight.bold,
      },
      spacing: {
        'brand-xs': brandTokens.spacing.xs,
        'brand-sm': brandTokens.spacing.sm,
        'brand-md': brandTokens.spacing.md,
        'brand-lg': brandTokens.spacing.lg,
        'brand-xl': brandTokens.spacing.xl,
      },
      borderRadius: {
        'brand-none': brandTokens.borderRadius.none,
        'brand-sm': brandTokens.borderRadius.sm,
        'brand-md': brandTokens.borderRadius.md,
        'brand-lg': brandTokens.borderRadius.lg,
        'brand-full': brandTokens.borderRadius.full,
      },
      boxShadow: {
        'brand-none': brandTokens.shadows.none,
        'brand-sm': brandTokens.shadows.sm,
        'brand-md': brandTokens.shadows.md,
        'brand-lg': brandTokens.shadows.lg,
      },
    },
  },
  plugins: [],
};
