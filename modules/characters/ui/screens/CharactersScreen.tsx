import React, { useCallback, useEffect } from 'react';

import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { RootStackScreenProps } from '@app/navigation/types';

import { AppText } from '@shared/ui/atoms/AppText';
import { ScreenWrapper } from '@shared/ui/molecules/ScreenWrapper';
import { useTheme } from '@shared/ui/theme/useTheme';

import { useCharacters } from '../hooks/useCharacters';
import { CharacterList } from '../organisms/CharacterList';

export default function CharactersScreen() {
  const nav = useNavigation<RootStackScreenProps<'Characters'>['navigation']>();
  const { theme } = useTheme();

  const { items, loading, loadingMore, error, loadFirst, loadNext } =
    useCharacters();

  useEffect(() => {
    void loadFirst();
  }, [loadFirst]);

  const handlePressItem = useCallback(
    (id: number) => {
      nav.navigate('CharacterDetail', { id });
    },
    [nav]
  );

  return (
    <ScreenWrapper style={{ backgroundColor: theme.colors.background }}>
      {/* Header con título temático */}
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.primaryContainer },
        ]}
      >
        <AppText
          style={[
            theme.typography.headlineMedium,
            { color: theme.colors.onPrimaryContainer, fontWeight: 'bold' },
          ]}
        >
          🛸 Rick & Morty
        </AppText>
        <AppText
          style={[
            theme.typography.bodyMedium,
            { color: theme.colors.onPrimaryContainer, opacity: 0.8 },
          ]}
        >
          Explora el multiverso
        </AppText>
      </View>

      <CharacterList
        data={items}
        loading={loading}
        loadingMore={loadingMore}
        error={error}
        onRetry={loadFirst}
        onEndReached={loadNext}
        onPressItem={handlePressItem}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingTop: 10,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    gap: 4,
  },
});
