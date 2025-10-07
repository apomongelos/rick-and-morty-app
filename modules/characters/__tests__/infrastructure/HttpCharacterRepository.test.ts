import { HttpCharacterRepository } from '@modules/characters/infrastructure/HttpCharacterRepository';

const mockRickPayload = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
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

const mockMortyPayload = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
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

const mockPaginatedResponse = {
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
  },
  results: [mockRickPayload, mockMortyPayload],
};

const mockLastPageResponse = {
  info: {
    count: 826,
    pages: 42,
    next: null,
    prev: 'https://rickandmortyapi.com/api/character?page=41',
  },
  results: [
    {
      ...mockRickPayload,
      id: 826,
      name: 'Last Character',
      status: 'unknown',
      species: 'Alien',
      image: 'https://rickandmortyapi.com/api/character/avatar/826.jpeg',
    },
  ],
};

const mockFetch = jest.spyOn(global, 'fetch');

describe('HttpCharacterRepository', () => {
  let repository: HttpCharacterRepository;

  beforeEach(() => {
    repository = new HttpCharacterRepository();
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  afterAll(() => {
    mockFetch.mockRestore();
  });

  describe('getCharacterById', () => {
    it('devuelve el personaje cuando la API responde 200', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockRickPayload,
      } as any);

      const character = await repository.getCharacterById(1);

      expect(character.id).toBe(1);
      expect(character.name).toBe('Rick Sanchez');
      expect(character.status).toBe('Alive');
      expect(character.species).toBe('Human');
      expect(character.image).toBe(
        'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      );
      expect(character.origin.name).toBe('Earth (C-137)');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character/1'
      );
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('mapea correctamente originName cuando origin.name es "unknown"', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockMortyPayload,
      } as any);

      const character = await repository.getCharacterById(2);
      expect(character.origin.name).toBe('unknown');
    });

    it('lanza error cuando la API responde con status !ok', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' }),
      } as any);

      await expect(repository.getCharacterById(999)).rejects.toThrow(
        'Personaje no encontrado'
      );
    });

    it('propaga errores de red cuando fetch rechaza', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network fail'));

      await expect(repository.getCharacterById(1)).rejects.toThrow(
        'Network fail'
      );
    });
  });

  describe('getCharacters', () => {
    it('devuelve lista de personajes con paginación', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPaginatedResponse,
      } as any);

      const result = await repository.getCharacters(1);

      expect(result.results).toHaveLength(2);
      expect(result.info.count).toBe(826);
      expect(result.info.pages).toBe(42);
      expect(result.info.next).toBe(
        'https://rickandmortyapi.com/api/character?page=2'
      );
      expect(result.info.prev).toBe(null);

      const firstCharacter = result.results[0];
      expect(firstCharacter.id).toBe(1);
      expect(firstCharacter.name).toBe('Rick Sanchez');
      expect(firstCharacter.status).toBe('Alive');
      expect(firstCharacter.species).toBe('Human');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?page=1'
      );
    });

    it('maneja correctamente la última página (sin next)', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockLastPageResponse,
      } as any);

      const result = await repository.getCharacters(42);

      expect(result.info.next).toBe(null);
      expect(result.info.prev).toBe(
        'https://rickandmortyapi.com/api/character?page=41'
      );
    });

    it('usa página 1 por defecto cuando no se especifica', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockPaginatedResponse,
      } as any);

      await repository.getCharacters();

      expect(mockFetch).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/character?page=1'
      );
    });

    it('lanza error cuando la API responde con error', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error' }),
      } as any);

      await expect(repository.getCharacters(1)).rejects.toThrow(
        'Error al cargar personajes'
      );
    });

    it('propaga errores de red', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Connection timeout'));

      await expect(repository.getCharacters(1)).rejects.toThrow(
        'Connection timeout'
      );
    });
  });
});
