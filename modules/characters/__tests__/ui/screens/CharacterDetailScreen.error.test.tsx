import React from 'react';

import { render, screen } from '@testing-library/react-native';

import CharacterDetailScreen from '@modules/characters/ui/screens/CharacterDetailScreen';

import { mockTheme } from '../../__mocks__/test-utils';

// Mock de React Navigation - debe estar al nivel superior
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    params: { id: 999 },
    key: 'CharacterDetail-test',
    name: 'CharacterDetail' as const,
  })),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

// Mock del tema
jest.mock('@shared/ui/theme/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme }),
}));

// Mock de favoritos
jest.mock('@favorites/infrastructure/FavoritesContext', () => ({
  useFavorites: () => ({
    toggle: jest.fn(),
    isFavorite: jest.fn().mockReturnValue(false),
  }),
}));

// Mock del hook useCharacterDetail para que retorne error
jest.mock('../../../ui/hooks/useCharacterDetail', () => ({
  useCharacterDetail: jest.fn(() => ({
    data: null,
    loading: false,
    error: 'No pudimos cargar el personaje',
    retry: jest.fn(),
  })),
}));

describe('CharacterDetailScreen - error', () => {
  it('muestra el mensaje de error cuando falla la carga', async () => {
    render(<CharacterDetailScreen />);

    // Verificar que no hay loading indicator ya que el estado es error directamente
    expect(screen.queryByTestId('loading-indicator')).not.toBeOnTheScreen();

    // Verificar que se muestra el mensaje de error
    expect(
      screen.getByText(/no pudimos cargar el personaje/i)
    ).toBeOnTheScreen();
  });
});
