import React from 'react';

import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { RootStackScreenProps } from '@app/navigation/types';

import { CharacterList } from '@modules/characters/ui/organisms/CharacterList';
import { useFavorites } from '@modules/favorites/infrastructure/FavoritesContext';

import { AppText } from '@shared/ui/atoms/AppText';
import { ScreenWrapper } from '@shared/ui/molecules/ScreenWrapper';
import { useTheme } from '@shared/ui/theme/useTheme';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const nav = useNavigation<RootStackScreenProps<'Favorites'>['navigation']>();
  const { theme } = useTheme();

  const handlePressItem = (id: number) => {
    nav.navigate('CharacterDetail', { id });
  };

  const handleRetry = () => {
    // No hay retry en favoritos, pero el componente lo requiere
  };

  return (
    <ScreenWrapper backgroundColor={theme.colors.background}>
      <View
        style={[
          styles.header,
          { backgroundColor: theme.colors.secondaryContainer },
        ]}
      >
        <AppText
          style={[
            theme.typography.headlineMedium,
            { color: theme.colors.onSecondaryContainer, fontWeight: 'bold' },
          ]}
        >
          ⭐ Mis Favoritos
        </AppText>
        <AppText
          style={[
            theme.typography.bodyMedium,
            { color: theme.colors.onSecondaryContainer, opacity: 0.8 },
          ]}
        >
          {favorites.length} personaje{favorites.length !== 1 ? 's' : ''}{' '}
          guardado{favorites.length !== 1 ? 's' : ''}
        </AppText>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <AppText
            style={[
              theme.typography.bodyLarge,
              { color: theme.colors.onSurface, textAlign: 'center' },
            ]}
          >
            🛸 No tienes favoritos aún
          </AppText>
        </View>
      ) : (
        <CharacterList
          data={favorites}
          loading={false}
          onRetry={handleRetry}
          onPressItem={handlePressItem}
        />
      )}
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
});
