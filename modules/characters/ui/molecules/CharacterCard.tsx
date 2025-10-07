import React, { useCallback } from 'react';

import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Character } from '@modules/characters/domain/Character';

import { AppText } from '@shared/ui/atoms/AppText';
import { useTheme } from '@shared/ui/theme/useTheme';

type Props = {
  character: Character;
  onPress: (id: number) => void;
};

export const CHARACTER_ROW_HEIGHT = 88;

export const CharacterCard: React.FC<Props> = React.memo(
  ({ character, onPress }) => {
    const { theme } = useTheme();
    const handlePress = useCallback(
      () => onPress(character.id),
      [onPress, character.id]
    );

    const getStatusColor = useCallback(
      (status: string) => {
        switch (status.toLowerCase()) {
          case 'alive':
            return theme.colors.success;
          case 'dead':
            return theme.colors.error;
          default:
            return theme.colors.warning;
        }
      },
      [theme.colors.success, theme.colors.error, theme.colors.warning]
    );

    return (
      <Pressable
        onPress={handlePress}
        style={[
          styles.row,
          {
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.outlineVariant,
          },
        ]}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: character.image }} style={styles.avatar} />
          <View
            style={[
              styles.statusIndicator,
              { backgroundColor: getStatusColor(character.status) },
            ]}
          />
        </View>

        <View style={styles.info}>
          <AppText
            style={[
              theme.typography.bodyLarge,
              {
                color: theme.colors.onSurface,
                fontWeight: 'bold',
                marginBottom: 2,
              },
            ]}
          >
            {character.name}
          </AppText>
          <AppText
            style={[
              theme.typography.bodyMedium,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {character.species}
          </AppText>
          <AppText
            style={[
              theme.typography.labelSmall,
              {
                color: getStatusColor(character.status),
                marginTop: 2,
                fontWeight: '600',
              },
            ]}
          >
            {character.status}
          </AppText>
        </View>
      </Pressable>
    );
  }
);

CharacterCard.displayName = 'CharacterCard';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    height: CHARACTER_ROW_HEIGHT,
    borderRadius: 8,
    borderWidth: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
});
