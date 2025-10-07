import React from 'react';

import { render, screen, waitFor } from '@testing-library/react-native';

import CharacterDetailScreen from '@modules/characters/ui/screens/CharacterDetailScreen';

import { clearMocks, mockTheme } from '../../__mocks__/test-utils';

// Mocks para navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mocks para favoritos
const mockToggle = jest.fn();
const mockIsFavorite = jest.fn().mockReturnValue(false);

// Mock de React Navigation - debe estar al nivel superior
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(() => ({
    params: { id: 1 },
    key: 'CharacterDetail-test',
    name: 'CharacterDetail' as const,
  })),
  useNavigation: () => mockNavigation,
}));

// Mock del tema
jest.mock('@shared/ui/theme/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme }),
}));

// Mock de favoritos
jest.mock('@favorites/infrastructure/FavoritesContext', () => ({
  useFavorites: () => ({
    toggle: mockToggle,
    isFavorite: mockIsFavorite,
  }),
}));

// Mock de fetch global para testing - simula respuestas de la API real
global.fetch = jest.fn();

// NO mockeamos GetCharacterById para que use fetch real
describe('CharacterDetailScreen - integración con API real', () => {
  beforeEach(() => {
    clearMocks();
    mockToggle.mockClear();
    mockIsFavorite.mockClear();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
    (fetch as jest.Mock).mockClear();
  });

  it('carga datos reales de la API usando fetch', async () => {
    // Mock de respuesta real de la API Rick & Morty
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth (C-137)', url: '' },
        location: { name: 'Citadel of Ricks', url: '' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [],
        url: '',
        created: '',
      }),
    });

    render(<CharacterDetailScreen />);

    expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen();

    await waitFor(
      () => {
        expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();
        expect(screen.queryByTestId('loading-indicator')).not.toBeOnTheScreen();
      },
      { timeout: 5000 }
    );

    expect(fetch).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/character/1'
    );
  });

  it('maneja errores de red en fetch', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<CharacterDetailScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeOnTheScreen();
      expect(screen.getByText(/error/i)).toBeOnTheScreen();
    });
  });

  it('maneja respuestas no válidas de la API', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<CharacterDetailScreen />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeOnTheScreen();
      expect(screen.getByText(/personaje no encontrado/i)).toBeOnTheScreen();
    });
  });
});
