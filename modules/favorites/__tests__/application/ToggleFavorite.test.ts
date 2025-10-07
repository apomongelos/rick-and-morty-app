import { Character, Gender } from '@modules/characters/domain/Character';
import { toggleFavorite } from '@modules/favorites/application/ToggleFavorite';

describe('ToggleFavorite', () => {
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

  it('should add character to favorites when it does not exist', () => {
    const favorites: Character[] = [];

    const result = toggleFavorite(favorites, mockCharacter1);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockCharacter1);
  });

  it('should remove character from favorites when it exists', () => {
    const favorites: Character[] = [mockCharacter1, mockCharacter2];

    const result = toggleFavorite(favorites, mockCharacter1);

    expect(result).toHaveLength(1);
    expect(result).toEqual([mockCharacter2]);
    expect(result).not.toContain(mockCharacter1);
  });

  it('should add character at the beginning of the list when adding to existing favorites', () => {
    const favorites: Character[] = [mockCharacter1];

    const result = toggleFavorite(favorites, mockCharacter2);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(mockCharacter2);
    expect(result[1]).toEqual(mockCharacter1);
  });

  it('should maintain other favorites when removing one character', () => {
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
      image: 'summer.jpg',
      episode: [],
      url: 'https://rickandmortyapi.com/api/character/3',
      created: '2017-11-04T19:00:00.000Z',
    };

    const favorites: Character[] = [
      mockCharacter1,
      mockCharacter2,
      mockCharacter3,
    ];

    const result = toggleFavorite(favorites, mockCharacter2);

    expect(result).toHaveLength(2);
    expect(result).toContain(mockCharacter1);
    expect(result).toContain(mockCharacter3);
    expect(result).not.toContain(mockCharacter2);
  });

  it('should work with empty favorites list', () => {
    const favorites: Character[] = [];

    const result = toggleFavorite(favorites, mockCharacter1);

    expect(result).toHaveLength(1);
    expect(result).toEqual([mockCharacter1]);
  });

  it('should not modify original favorites array', () => {
    const favorites: Character[] = [mockCharacter1];
    const originalLength = favorites.length;

    toggleFavorite(favorites, mockCharacter2);

    expect(favorites).toHaveLength(originalLength);
    expect(favorites).toEqual([mockCharacter1]);
  });
});
