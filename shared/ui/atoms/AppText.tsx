import React from 'react';

import { Text, TextProps } from 'react-native';

import type { TypographyVariant } from '../theme/typography';
import { useTheme } from '../theme/useTheme';

type Props = TextProps & {
  variant?: TypographyVariant;
  color?: string;
};

export const AppText: React.FC<Props> = ({
  variant = 'bodyMedium',
  color,
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const t = theme.typography[variant];
  const fallbackColor = theme.colors.onSurface;
  return (
    <Text style={[t, { color: color ?? fallbackColor }, style]} {...rest}>
      {children}
    </Text>
  );
};
