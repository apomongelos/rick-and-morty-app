import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import CharactersScreen from '@modules/characters/ui/screens/CharactersScreen';

import {
  clearMocks,
  mockCharacters,
  mockTheme,
} from '../../__mocks__/test-utils';

// Mocks para navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock de las funciones del hook
const mockLoadFirst = jest.fn();
const mockLoadNext = jest.fn();

// Mock de React Navigation - debe estar al nivel superior
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Mock del tema
jest.mock('@shared/ui/theme/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme }),
}));

// Mock del hook useCharacters para caso de éxito
jest.mock('../../../ui/hooks/useCharacters', () => ({
  useCharacters: jest.fn(() => ({
    items: mockCharacters,
    loading: false,
    loadingMore: false,
    error: null,
    loadFirst: mockLoadFirst,
    loadNext: mockLoadNext,
  })),
}));

describe('CharactersScreen - éxito', () => {
  beforeEach(() => {
    clearMocks();
    mockLoadFirst.mockClear();
    mockLoadNext.mockClear();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
  });

  it('muestra el header y la lista de personajes', () => {
    render(<CharactersScreen />);

    expect(screen.getByText('🛸 Rick & Morty')).toBeOnTheScreen();
    expect(screen.getByText('Explora el multiverso')).toBeOnTheScreen();
    expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();
    expect(screen.getByText('Morty Smith')).toBeOnTheScreen();
  });

  it('navega al detalle cuando se presiona un personaje', () => {
    render(<CharactersScreen />);

    const rickItem = screen.getByText('Rick Sanchez');
    fireEvent.press(rickItem);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('CharacterDetail', {
      id: 1,
    });
  });

  it('carga la primera página al montar el componente', () => {
    render(<CharactersScreen />);

    // El componente llama a loadFirst en useEffect
    expect(mockLoadFirst).toHaveBeenCalled();
  });
});
