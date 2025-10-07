import React from 'react';

import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import { useRoute } from '@react-navigation/native';

import type { RootStackScreenProps } from '@app/navigation/types';

import { useFavorites } from '@modules/favorites/infrastructure/FavoritesContext';

import { AppButton } from '@shared/ui/atoms/AppButton';
import { AppText } from '@shared/ui/atoms/AppText';
import { DetailItem } from '@shared/ui/molecules/DetailItem';
import { ScreenWrapper } from '@shared/ui/molecules/ScreenWrapper';
import { useTheme } from '@shared/ui/theme/useTheme';

import { useCharacterDetail } from '../hooks/useCharacterDetail';

export default function CharacterDetailScreen() {
  const route = useRoute<RootStackScreenProps<'CharacterDetail'>['route']>();
  const { id } = route.params;
  const { theme } = useTheme();

  const { data, loading, error, retry } = useCharacterDetail(id);
  const { toggle, isFavorite } = useFavorites();

  if (loading)
    return (
      <ScreenWrapper>
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={theme.colors.primary}
            testID="loading-indicator"
          />
        </View>
      </ScreenWrapper>
    );

  if (error)
    return (
      <ScreenWrapper>
        <View
          style={[
            styles.errorContainer,
            { backgroundColor: theme.colors.error },
          ]}
        >
          <AppText
            style={[
              theme.typography.bodyMedium,
              { color: theme.colors.onError },
            ]}
          >
            {error}
          </AppText>
          <AppButton title="Reintentar" onPress={retry} variant="secondary" />
        </View>
      </ScreenWrapper>
    );

  if (!data) return null;

  const fav = isFavorite(data.id);

  return (
    <ScreenWrapper>
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Image source={{ uri: data.image }} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <AppText
          style={[
            theme.typography.headlineLarge,
            { color: theme.colors.onSurface, marginBottom: 16 },
          ]}
        >
          {data.name}
        </AppText>

        <View style={styles.detailsContainer}>
          <DetailItem label="Estado" value={data.status} />
          <DetailItem label="Especie" value={data.species} />
          <DetailItem label="Origen" value={data.origin.name} />
        </View>

        <AppButton
          accessibilityRole="button"
          accessibilityLabel={
            fav ? 'Quitar de Favoritos' : 'Agregar a Favoritos'
          }
          title={fav ? '⭐ Quitar de Favoritos' : '🚀 Agregar a Favoritos'}
          variant={fav ? 'warning' : 'primary'}
          onPress={() => toggle(data)}
          style={styles.favoriteButton}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  imageContainer: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
  },
  infoContainer: {
    flex: 1,
  },
  detailsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  favoriteButton: {
    marginTop: 'auto',
  },
});
