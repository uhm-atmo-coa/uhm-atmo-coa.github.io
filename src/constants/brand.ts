import tokens from './brand-tokens.json';

export type BrandTokens = typeof tokens;

export const brandTokens = tokens;

export const brandColors = tokens.palette;

export const brandTypography = tokens.typography;

export const brandSpacing = tokens.spacing;

export const brandBorderRadius = tokens.borderRadius;

export const brandShadows = tokens.shadows;

export const brandStyle = {
  name: tokens.name,
  typography: tokens.typography,
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  shadows: tokens.shadows,
} as const;
