import { getCharacters } from '@modules/characters/application/GetCharacters';
import { Character, Gender } from '@modules/characters/domain/Character';
import { CharacterRepository } from '@modules/characters/domain/CharacterRepository';

import { Page } from '@shared/domain/Page';

describe('GetCharacters', () => {
  let mockRepository: jest.Mocked<CharacterRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getCharacterById: jest.fn(),
    };
  });

  const mockCharacters: Character[] = [
    {
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
    },
    {
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
    },
  ];

  const mockPage: Page<Character> = {
    results: mockCharacters,
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character/?page=2',
      prev: undefined,
    },
  };

  it('should return a page of characters for the default page (1)', async () => {
    mockRepository.getCharacters.mockResolvedValue(mockPage);

    const getCharactersWithRepo = getCharacters(mockRepository);
    const result = await getCharactersWithRepo();

    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockPage);
    expect(result.results).toHaveLength(2);
  });

  it('should return a page of characters for a specific page', async () => {
    mockRepository.getCharacters.mockResolvedValue(mockPage);

    const getCharactersWithRepo = getCharacters(mockRepository);
    const result = await getCharactersWithRepo(3);

    expect(mockRepository.getCharacters).toHaveBeenCalledWith(3);
    expect(result).toEqual(mockPage);
  });

  it('should handle repository errors', async () => {
    const error = new Error('Network error');
    mockRepository.getCharacters.mockRejectedValue(error);

    const getCharactersWithRepo = getCharacters(mockRepository);

    await expect(getCharactersWithRepo(1)).rejects.toThrow('Network error');
    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1);
  });

  it('should handle empty results page', async () => {
    const emptyPage: Page<Character> = {
      results: [],
      info: {
        count: 0,
        pages: 0,
        next: '',
        prev: undefined,
      },
    };
    mockRepository.getCharacters.mockResolvedValue(emptyPage);

    const getCharactersWithRepo = getCharacters(mockRepository);
    const result = await getCharactersWithRepo(999);

    expect(mockRepository.getCharacters).toHaveBeenCalledWith(999);
    expect(result).toEqual(emptyPage);
    expect(result.results).toHaveLength(0);
  });

  it('should call repository with page 1 when no page parameter is provided', async () => {
    mockRepository.getCharacters.mockResolvedValue(mockPage);

    const getCharactersWithRepo = getCharacters(mockRepository);
    await getCharactersWithRepo();

    expect(mockRepository.getCharacters).toHaveBeenCalledWith(1);
    expect(mockRepository.getCharacters).toHaveBeenCalledTimes(1);
  });

  it('should handle different page numbers correctly', async () => {
    const pages = [1, 5, 10, 42];
    const getCharactersWithRepo = getCharacters(mockRepository);

    for (const page of pages) {
      mockRepository.getCharacters.mockResolvedValue(mockPage);

      await getCharactersWithRepo(page);

      expect(mockRepository.getCharacters).toHaveBeenCalledWith(page);
    }

    expect(mockRepository.getCharacters).toHaveBeenCalledTimes(pages.length);
  });

  it('should create a reusable function with injected repository', async () => {
    mockRepository.getCharacters.mockResolvedValue(mockPage);

    const getCharactersWithRepo = getCharacters(mockRepository);

    // Podemos reutilizar la función múltiples veces
    await getCharactersWithRepo(1);
    await getCharactersWithRepo(2);
    await getCharactersWithRepo(3);

    expect(mockRepository.getCharacters).toHaveBeenCalledTimes(3);
    expect(mockRepository.getCharacters).toHaveBeenNthCalledWith(1, 1);
    expect(mockRepository.getCharacters).toHaveBeenNthCalledWith(2, 2);
    expect(mockRepository.getCharacters).toHaveBeenNthCalledWith(3, 3);
  });
});
