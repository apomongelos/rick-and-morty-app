import { Character, Gender } from '@modules/characters/domain/Character';
import { isFavorite } from '@modules/favorites/application/IsFavorite';

describe('IsFavorite', () => {
  const mockCharacter1: Character = {
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

  const mockCharacter2: Character = {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male' as Gender,
    origin: {
      name: 'unknown',
      url: '',
    },
    location: {
      name: 'Citadel of Ricks',
      url: 'https://rickandmortyapi.com/api/location/3',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/1'],
    url: 'https://rickandmortyapi.com/api/character/2',
    created: '2017-11-04T18:50:21.651Z',
  };

  const mockCharacter3: Character = {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Female' as Gender,
    origin: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    location: {
      name: 'Earth (Replacement Dimension)',
      url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    episode: ['https://rickandmortyapi.com/api/episode/6'],
    url: 'https://rickandmortyapi.com/api/character/3',
    created: '2017-11-04T19:09:56.428Z',
  };

  it('should return true when character is in favorites', () => {
    const favorites: Character[] = [mockCharacter1, mockCharacter2];

    const result = isFavorite(favorites, 1);

    expect(result).toBe(true);
  });

  it('should return false when character is not in favorites', () => {
    const favorites: Character[] = [mockCharacter1, mockCharacter2];

    const result = isFavorite(favorites, 99);

    expect(result).toBe(false);
  });

  it('should return false when favorites list is empty', () => {
    const favorites: Character[] = [];

    const result = isFavorite(favorites, 1);

    expect(result).toBe(false);
  });

  it('should work with multiple characters in favorites', () => {
    const favorites: Character[] = [
      mockCharacter1,
      mockCharacter2,
      mockCharacter3,
    ];

    expect(isFavorite(favorites, 1)).toBe(true);
    expect(isFavorite(favorites, 2)).toBe(true);
    expect(isFavorite(favorites, 3)).toBe(true);
    expect(isFavorite(favorites, 4)).toBe(false);
  });

  it('should handle edge case with id 0', () => {
    const mockCharacterWithZeroId: Character = {
      id: 0,
      name: 'Test Character',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male' as Gender,
      origin: { name: 'Test Origin', url: '' },
      location: { name: 'Test Location', url: '' },
      image: 'test.jpg',
      episode: [],
      url: '',
      created: '',
    };
    const favorites: Character[] = [mockCharacterWithZeroId];

    const result = isFavorite(favorites, 0);

    expect(result).toBe(true);
  });

  it('should handle negative ids', () => {
    const favorites: Character[] = [mockCharacter1, mockCharacter2];

    const result = isFavorite(favorites, -1);

    expect(result).toBe(false);
  });
});
