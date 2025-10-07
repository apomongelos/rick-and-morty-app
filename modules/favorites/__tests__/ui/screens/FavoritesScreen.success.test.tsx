import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import FavoritesScreen from '@modules/favorites/ui/screens/FavoritesScreen';

import {
  clearMocks,
  mockTheme,
} from '../../../../characters/__tests__/__mocks__/test-utils';

// Mock del contexto de favoritos - debe estar antes de renderizar el componente
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
      {
        id: 2,
        name: 'Morty Smith',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'unknown', url: '' },
        location: { name: 'Citadel of Ricks', url: '' },
        image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
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

// Mock de React Navigation - debe estar al nivel superior
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Mock del tema
jest.mock('@shared/ui/theme/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme }),
}));

describe('FavoritesScreen - éxito', () => {
  beforeEach(() => {
    clearMocks();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
  });

  it('muestra el header y la lista de favoritos', () => {
    render(<FavoritesScreen />);

    expect(screen.getByText('⭐ Mis Favoritos')).toBeOnTheScreen();
    expect(screen.getByText('2 personajes guardados')).toBeOnTheScreen();
    expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();
    expect(screen.getByText('Morty Smith')).toBeOnTheScreen();
  });

  it('navega al detalle cuando se presiona un personaje', () => {
    render(<FavoritesScreen />);

    const rickItem = screen.getByText('Rick Sanchez');
    fireEvent.press(rickItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('CharacterDetail', {
      id: 1,
    });
  });

  it('muestra el contador correcto de favoritos', () => {
    render(<FavoritesScreen />);

    expect(screen.getByText('2 personajes guardados')).toBeOnTheScreen();
  });
});
