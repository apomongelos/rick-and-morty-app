import { getCharacterById } from '@modules/characters/application/GetCharacterById';
import { Character, Gender } from '@modules/characters/domain/Character';
import { CharacterRepository } from '@modules/characters/domain/CharacterRepository';

describe('GetCharacterById', () => {
  let mockRepository: jest.Mocked<CharacterRepository>;

  beforeEach(() => {
    mockRepository = {
      getCharacters: jest.fn(),
      getCharacterById: jest.fn(),
    };
  });

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

  it('should return a character by id', async () => {
    mockRepository.getCharacterById.mockResolvedValue(mockCharacter);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);
    const result = await getCharacterByIdWithRepo(1);

    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockCharacter);
  });

  it('should call repository with the correct id', async () => {
    mockRepository.getCharacterById.mockResolvedValue(mockCharacter);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);
    await getCharacterByIdWithRepo(42);

    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(42);
    expect(mockRepository.getCharacterById).toHaveBeenCalledTimes(1);
  });

  it('should handle repository errors', async () => {
    const error = new Error('Character not found');
    mockRepository.getCharacterById.mockRejectedValue(error);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);

    await expect(getCharacterByIdWithRepo(999)).rejects.toThrow(
      'Character not found'
    );
    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(999);
  });

  it('should handle different character ids', async () => {
    const characters = [
      { ...mockCharacter, id: 1, name: 'Rick Sanchez' },
      { ...mockCharacter, id: 2, name: 'Morty Smith' },
      { ...mockCharacter, id: 3, name: 'Summer Smith' },
    ];

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);

    for (const character of characters) {
      mockRepository.getCharacterById.mockResolvedValue(character);

      const result = await getCharacterByIdWithRepo(character.id);

      expect(mockRepository.getCharacterById).toHaveBeenCalledWith(
        character.id
      );
      expect(result).toEqual(character);
    }

    expect(mockRepository.getCharacterById).toHaveBeenCalledTimes(
      characters.length
    );
  });

  it('should handle edge case with id 0', async () => {
    const characterWithZeroId = {
      ...mockCharacter,
      id: 0,
      name: 'Test Character',
    };
    mockRepository.getCharacterById.mockResolvedValue(characterWithZeroId);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);
    const result = await getCharacterByIdWithRepo(0);

    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(0);
    expect(result).toEqual(characterWithZeroId);
  });

  it('should handle negative ids', async () => {
    const error = new Error('Invalid character id');
    mockRepository.getCharacterById.mockRejectedValue(error);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);

    await expect(getCharacterByIdWithRepo(-1)).rejects.toThrow(
      'Invalid character id'
    );
    expect(mockRepository.getCharacterById).toHaveBeenCalledWith(-1);
  });

  it('should return character with all required properties', async () => {
    const completeCharacter: Character = {
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
    mockRepository.getCharacterById.mockResolvedValue(completeCharacter);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);
    const result = await getCharacterByIdWithRepo(1);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('species');
    expect(result).toHaveProperty('image');
    expect(result).toEqual(completeCharacter);
  });

  it('should create a reusable function with injected repository', async () => {
    mockRepository.getCharacterById.mockResolvedValue(mockCharacter);

    const getCharacterByIdWithRepo = getCharacterById(mockRepository);

    // Podemos reutilizar la función múltiples veces
    await getCharacterByIdWithRepo(1);
    await getCharacterByIdWithRepo(2);
    await getCharacterByIdWithRepo(3);

    expect(mockRepository.getCharacterById).toHaveBeenCalledTimes(3);
    expect(mockRepository.getCharacterById).toHaveBeenNthCalledWith(1, 1);
    expect(mockRepository.getCharacterById).toHaveBeenNthCalledWith(2, 2);
    expect(mockRepository.getCharacterById).toHaveBeenNthCalledWith(3, 3);
  });
});
