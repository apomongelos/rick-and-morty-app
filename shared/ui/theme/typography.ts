export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'normal'
  | 'bold';

export type TypographyVariant =
  | 'displayLarge'
  | 'displayMedium'
  | 'displaySmall'
  | 'headlineLarge'
  | 'headlineMedium'
  | 'headlineSmall'
  | 'titleLarge'
  | 'titleMedium'
  | 'titleSmall'
  | 'labelLarge'
  | 'labelMedium'
  | 'labelSmall'
  | 'bodyLarge'
  | 'bodyMedium'
  | 'bodySmall';

export interface TypographyToken {
  readonly fontFamily: string;
  readonly fontSize: number; // sp
  readonly lineHeight: number; // sp
  readonly letterSpacing?: number; // en RN es dp; opcional
  readonly fontWeight: FontWeight;
}

export type TypographyScale = Readonly<
  Record<TypographyVariant, TypographyToken>
>;

export interface TypographyConfig {
  readonly fontFamily: {
    readonly regular: string;
    readonly medium: string;
    readonly semibold: string;
    readonly bold: string;
  };
}

export const createTypography = (cfg: TypographyConfig): TypographyScale =>
  ({
    // Displays son para hero/landing o headers muy prominentes
    displayLarge: {
      fontFamily: cfg.fontFamily.bold,
      fontSize: 57,
      lineHeight: 64,
      letterSpacing: 0,
      fontWeight: '700',
    },
    displayMedium: {
      fontFamily: cfg.fontFamily.bold,
      fontSize: 45,
      lineHeight: 52,
      letterSpacing: 0,
      fontWeight: '700',
    },
    displaySmall: {
      fontFamily: cfg.fontFamily.bold,
      fontSize: 36,
      lineHeight: 44,
      letterSpacing: 0,
      fontWeight: '700',
    },

    // Headline: títulos de pantalla y secciones
    headlineLarge: {
      fontFamily: cfg.fontFamily.bold,
      fontSize: 32,
      lineHeight: 40,
      letterSpacing: 0,
      fontWeight: '700',
    },
    headlineMedium: {
      fontFamily: cfg.fontFamily.bold,
      fontSize: 28,
      lineHeight: 36,
      letterSpacing: 0,
      fontWeight: '700',
    },
    headlineSmall: {
      fontFamily: cfg.fontFamily.semibold,
      fontSize: 24,
      lineHeight: 32,
      letterSpacing: 0,
      fontWeight: '600',
    },

    // Title: subtítulos, app bars
    titleLarge: {
      fontFamily: cfg.fontFamily.semibold,
      fontSize: 22,
      lineHeight: 28,
      letterSpacing: 0,
      fontWeight: '600',
    },
    titleMedium: {
      fontFamily: cfg.fontFamily.medium,
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: '500',
    },
    titleSmall: {
      fontFamily: cfg.fontFamily.medium,
      fontSize: 16,
      lineHeight: 22,
      letterSpacing: 0.1,
      fontWeight: '500',
    },

    // Label: chips, badges, buttons
    labelLarge: {
      fontFamily: cfg.fontFamily.semibold,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.1,
      fontWeight: '600',
    },
    labelMedium: {
      fontFamily: cfg.fontFamily.medium,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '500',
    },
    labelSmall: {
      fontFamily: cfg.fontFamily.bold,
      fontSize: 11,
      lineHeight: 16,
      letterSpacing: 0.5,
      fontWeight: '700',
    },

    // Body: párrafos y descripciones
    bodyLarge: {
      fontFamily: cfg.fontFamily.regular,
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.15,
      fontWeight: '400',
    },
    bodyMedium: {
      fontFamily: cfg.fontFamily.regular,
      fontSize: 14,
      lineHeight: 20,
      letterSpacing: 0.25,
      fontWeight: '400',
    },
    bodySmall: {
      fontFamily: cfg.fontFamily.regular,
      fontSize: 12,
      lineHeight: 16,
      letterSpacing: 0.4,
      fontWeight: '400',
    },
  }) as const;

export const defaultTypography = createTypography({
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
});
