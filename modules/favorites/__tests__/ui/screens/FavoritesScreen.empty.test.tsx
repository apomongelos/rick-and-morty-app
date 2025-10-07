import React from 'react';

import { render, screen } from '@testing-library/react-native';

import FavoritesScreen from '@modules/favorites/ui/screens/FavoritesScreen';

import {
  clearMocks,
  mockTheme,
} from '../../../../characters/__tests__/__mocks__/test-utils';

// Mock del contexto de favoritos con lista vacía
jest.mock('@modules/favorites/infrastructure/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [], // Lista vacía
    toggle: jest.fn(),
    isFavorite: jest.fn(),
  }),
}));

// Mocks para navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock de React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Mock del tema
jest.mock('@shared/ui/theme/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme }),
}));

describe('FavoritesScreen - vacío', () => {
  beforeEach(() => {
    clearMocks();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
  });

  it('muestra el estado vacío cuando no hay favoritos', () => {
    render(<FavoritesScreen />);

    expect(screen.getByText('⭐ Mis Favoritos')).toBeOnTheScreen();
    expect(screen.getByText('0 personajes guardados')).toBeOnTheScreen();
    expect(screen.getByText('🛸 No tienes favoritos aún')).toBeOnTheScreen();
  });

  it('no muestra la lista cuando está vacía', () => {
    render(<FavoritesScreen />);

    expect(screen.queryByText('Rick Sanchez')).not.toBeOnTheScreen();
    expect(screen.queryByText('Morty Smith')).not.toBeOnTheScreen();
  });
});
