import React from 'react';

import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';

import { useTheme } from '@shared/ui/theme/useTheme';

import { AppText } from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'warning' | 'error';

type Props = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  style?: ViewStyle;
};

export const AppButton: React.FC<Props> = ({
  title,
  variant = 'primary',
  style,
  ...pressableProps
}) => {
  const { theme } = useTheme();

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.onPrimary,
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
          textColor: theme.colors.onSecondary,
        };
      case 'warning':
        return {
          backgroundColor: theme.colors.warning,
          textColor: theme.colors.onWarning,
        };
      case 'error':
        return {
          backgroundColor: theme.colors.error,
          textColor: theme.colors.onError,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          textColor: theme.colors.onPrimary,
        };
    }
  };

  const { backgroundColor, textColor } = getButtonColors();

  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      {...pressableProps}
    >
      <AppText
        style={[
          theme.typography.labelLarge,
          { color: textColor, fontWeight: '600' },
        ]}
      >
        {title}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
});
