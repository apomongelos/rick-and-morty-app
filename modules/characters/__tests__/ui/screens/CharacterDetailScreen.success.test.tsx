import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react-native';

import CharacterDetailScreen from '@modules/characters/ui/screens/CharacterDetailScreen';

import {
  clearMocks,
  mockCharacter,
  mockTheme,
} from '../../__mocks__/test-utils';

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
    params: { id: 42 },
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

// Mock del hook useCharacterDetail para simular loading y luego success
const mockUseCharacterDetail = jest.fn();
jest.mock('../../../ui/hooks/useCharacterDetail', () => ({
  useCharacterDetail: () => mockUseCharacterDetail(),
}));

describe('CharacterDetailScreen - éxito', () => {
  beforeEach(() => {
    clearMocks();
    mockIsFavorite.mockClear();
    mockToggle.mockClear();
    mockNavigation.navigate.mockClear();
    mockNavigation.goBack.mockClear();
    mockIsFavorite.mockReturnValue(false);
  });

  it('muestra loading cuando está cargando', () => {
    // Simular estado de loading
    mockUseCharacterDetail.mockReturnValue({
      data: null,
      loading: true,
      error: null,
      retry: jest.fn(),
    });

    render(<CharacterDetailScreen />);

    expect(screen.getByTestId('loading-indicator')).toBeOnTheScreen();
  });

  it('muestra los datos del personaje cuando carga exitosamente', () => {
    // Simular estado de éxito
    mockUseCharacterDetail.mockReturnValue({
      data: mockCharacter,
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<CharacterDetailScreen />);

    expect(screen.getByText('Beth Smith')).toBeOnTheScreen();
    expect(screen.queryByTestId('loading-indicator')).not.toBeOnTheScreen();

    expect(screen.getByText(/Estado/i)).toBeTruthy();
    expect(screen.getByText(/Alive/i)).toBeTruthy();
    expect(screen.getByText(/Especie/i)).toBeTruthy();
    expect(screen.getByText(/Human/i)).toBeTruthy();
    expect(screen.getByText(/Origen/i)).toBeTruthy();
    expect(screen.getByText(/Earth/i)).toBeTruthy();

    const addBtn = screen.getByRole('button', { name: /agregar a favoritos/i });
    expect(addBtn).toBeEnabled();

    fireEvent.press(addBtn);
    expect(mockToggle).toHaveBeenCalledWith(mockCharacter);
  });

  it('si ya es favorito, el botón muestra "Quitar de Favoritos"', () => {
    mockIsFavorite.mockReturnValue(true);
    mockUseCharacterDetail.mockReturnValue({
      data: mockCharacter,
      loading: false,
      error: null,
      retry: jest.fn(),
    });

    render(<CharacterDetailScreen />);

    expect(
      screen.getByRole('button', { name: /quitar de favoritos/i })
    ).toBeOnTheScreen();
  });
});
