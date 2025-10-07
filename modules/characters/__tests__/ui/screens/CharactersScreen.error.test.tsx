import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import CharactersScreen from '@modules/characters/ui/screens/CharactersScreen';

import { clearMocks, mockTheme } from '../../__mocks__/test-utils';

// Mocks para navigation
const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Mock del loadFirst
const mockLoadFirst = jest.fn();

// Mock de React Navigation - debe estar al nivel superior
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => mockNavigation,
}));

// Mock del tema
jest.mock('@shared/ui/theme/useTheme', () => ({
  useTheme: () => ({ theme: mockTheme }),
}));

// Mock específico para caso de error
jest.mock('../../../ui/hooks/useCharacters', () => ({
  useCharacters: jest.fn(() => ({
    items: [],
    loading: false,
    loadingMore: false,
    error: 'No se pudo conectar con el servidor',
    loadFirst: mockLoadFirst,
    loadNext: jest.fn(),
  })),
}));

describe('CharactersScreen - error', () => {
  beforeEach(() => {
    clearMocks();
    mockLoadFirst.mockClear();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
  });

  it('muestra el mensaje de error cuando falla la carga', () => {
    render(<CharactersScreen />);

    expect(
      screen.getByText(/no se pudo conectar con el servidor/i)
    ).toBeOnTheScreen();
  });

  it('muestra el botón de reintentar', () => {
    render(<CharactersScreen />);

    const retryButton = screen.getByText(/reintentar/i);
    expect(retryButton).toBeOnTheScreen();

    // Limpiar las llamadas previas (del useEffect inicial)
    mockLoadFirst.mockClear();

    fireEvent.press(retryButton);
    expect(mockLoadFirst).toHaveBeenCalledTimes(1);
  });

  it('el header sigue visible durante el error', () => {
    render(<CharactersScreen />);

    expect(screen.getByText('🛸 Rick & Morty')).toBeOnTheScreen();
    expect(screen.getByText('Explora el multiverso')).toBeOnTheScreen();
  });
});
