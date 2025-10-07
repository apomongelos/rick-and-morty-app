import React, { PropsWithChildren } from 'react';

import { StyleSheet, View, ViewStyle } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type Props = PropsWithChildren<{
  padded?: boolean;
  backgroundColor?: string;
  style?: ViewStyle;
}>;

export const ScreenWrapper: React.FC<Props> = ({
  children,
  padded = true,
  backgroundColor = '#fff',
  style,
}) => {
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor }, style]}>
      <View style={[styles.content, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { flex: 1 },
  padded: { padding: 16 },
});
