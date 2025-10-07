import React from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { AppText } from '@shared/ui/atoms/AppText';
import { useTheme } from '@shared/ui/theme/useTheme';

type Props = {
  label: string;
  value: string;
  style?: ViewStyle;
};

export const DetailItem: React.FC<Props> = ({ label, value, style }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface1 },
        style,
      ]}
    >
      <AppText
        style={[
          theme.typography.labelMedium,
          { color: theme.colors.onSurfaceVariant },
        ]}
      >
        {label}
      </AppText>
      <AppText
        style={[theme.typography.bodyLarge, { color: theme.colors.onSurface }]}
      >
        {value}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    gap: 4,
  },
});
