import React from 'react';

import { render, screen } from '@testing-library/react-native';

import FavoritesScreen from '@modules/favorites/ui/screens/FavoritesScreen';

import {
  clearMocks,
  mockTheme,
} from '../../../../characters/__tests__/__mocks__/test-utils';

// Mock del contexto de favoritos con un solo personaje
jest.mock('@modules/favorites/infrastructure/FavoritesContext', () => ({
  useFavorites: () => ({
    favorites: [
      {
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
      },
    ],
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

describe('FavoritesScreen - un favorito', () => {
  beforeEach(() => {
    clearMocks();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
  });

  it('muestra singular cuando hay un solo favorito', () => {
    render(<FavoritesScreen />);

    expect(screen.getByText('⭐ Mis Favoritos')).toBeOnTheScreen();
    expect(screen.getByText('1 personaje guardado')).toBeOnTheScreen();
    expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();
  });

  it('no muestra el segundo personaje', () => {
    render(<FavoritesScreen />);

    expect(screen.queryByText('Morty Smith')).not.toBeOnTheScreen();
  });
});
