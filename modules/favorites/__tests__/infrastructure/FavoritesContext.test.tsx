import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { act, fireEvent, render, screen } from '@testing-library/react-native';

import { Character, Gender } from '@characters/domain/Character';

import {
  FavoritesProvider,
  useFavorites,
} from '../../infrastructure/FavoritesContext';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male' as Gender,
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1'],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
};

function TestComponent() {
  const { favorites, toggle, isFavorite } = useFavorites();

  return (
    <View>
      <Text testID="count">{favorites.length}</Text>
      <Text testID="is-favorite">{isFavorite(1) ? 'yes' : 'no'}</Text>
      <TouchableOpacity testID="toggle" onPress={() => toggle(mockCharacter)}>
        <Text>Toggle</Text>
      </TouchableOpacity>
    </View>
  );
}

describe('FavoritesContext', () => {
  it('funciona correctamente', () => {
    render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    // Estado inicial
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('no');

    // Agregar favorito
    act(() => {
      fireEvent.press(screen.getByTestId('toggle'));
    });

    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('yes');

    // Quitar favorito
    act(() => {
      fireEvent.press(screen.getByTestId('toggle'));
    });

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('no');
  });

  it('hook requiere provider', () => {
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useFavorites must be used within FavoritesProvider');
  });
});
