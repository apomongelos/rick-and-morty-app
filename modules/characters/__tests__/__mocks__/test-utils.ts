import type { Character, Gender } from '@characters/domain/Character';

// Navigation mocks
export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

// Favorites mocks
export const mockToggle = jest.fn();
export const mockIsFavorite = jest.fn().mockReturnValue(false);

// Theme mock - común para todas las pantallas
export const mockTheme = {
  colors: {
    background: '#fff',
    primary: '#6200ee',
    primaryContainer: '#6200ee',
    onPrimaryContainer: '#fff',
    secondaryContainer: '#e3f2fd',
    onSecondaryContainer: '#0d47a1',
    error: '#B00020',
    onError: '#fff',
    surfaceVariant: '#eee',
    onSurface: '#111',
    surface: '#f5f5f5',
  },
  typography: {
    bodyMedium: { fontSize: 14 },
    headlineMedium: { fontSize: 24 },
    headlineLarge: { fontSize: 28 },
    bodyLarge: { fontSize: 16 },
  },
};

// Character data mocks
export const mockCharacter: Character = {
  id: 42,
  name: 'Beth Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Female' as Gender,
  origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
  location: {
    name: 'Earth2',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  image: 'https://example.com/beth.png',
  episode: ['https://rickandmortyapi.com/api/episode/6'],
  url: 'https://rickandmortyapi.com/api/character/42',
  created: '2017-11-04T19:00:00.000Z',
};

export const mockCharacters: Character[] = [
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

// Characters hook mocks
export const mockLoadFirst = jest.fn();
export const mockLoadNext = jest.fn();

// Mock variable for character ID
let mockCharacterId = 42;

// Mock variable for favorites
let mockFavorites: Character[] = mockCharacters;

// Setup común de mocks para CharacterDetailScreen
export const setupCharacterDetailMocks = (characterId: number = 42) => {
  mockCharacterId = characterId;

  jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(() => ({
      params: { id: mockCharacterId },
      key: 'CharacterDetail-test',
      name: 'CharacterDetail' as const,
    })),
    useNavigation: () => mockNavigation,
  }));

  jest.mock('@favorites/infrastructure/FavoritesContext', () => ({
    useFavorites: () => ({
      toggle: mockToggle,
      isFavorite: mockIsFavorite,
    }),
  }));

  jest.mock('@shared/ui/theme/useTheme', () => ({
    useTheme: () => ({ theme: mockTheme }),
  }));

  jest.mock('../../../../ui/hooks/useCharacterDetail', () => ({
    useCharacterDetail: jest.fn(() => ({
      data: mockCharacter,
      loading: false,
      error: null,
      retry: jest.fn(),
    })),
  }));
};

// Setup común de mocks para CharactersScreen
export const setupCharactersScreenMocks = () => {
  jest.mock('@react-navigation/native', () => ({
    useNavigation: () => mockNavigation,
  }));

  jest.mock('@shared/ui/theme/useTheme', () => ({
    useTheme: () => ({ theme: mockTheme }),
  }));

  jest.mock('../../../../ui/hooks/useCharacters', () => ({
    useCharacters: jest.fn(() => ({
      items: mockCharacters,
      loading: false,
      loadingMore: false,
      error: null,
      loadFirst: mockLoadFirst,
      loadNext: mockLoadNext,
    })),
  }));
};

// Setup común de mocks para FavoritesScreen
export const setupFavoritesScreenMocks = (
  favorites: Character[] = mockCharacters
) => {
  mockFavorites = favorites;

  jest.mock('@react-navigation/native', () => ({
    useNavigation: () => mockNavigation,
  }));

  jest.mock('@shared/ui/theme/useTheme', () => ({
    useTheme: () => ({ theme: mockTheme }),
  }));

  jest.mock('@modules/favorites/infrastructure/FavoritesContext', () => ({
    useFavorites: () => ({
      favorites: mockFavorites,
    }),
  }));
};

export const clearMocks = () => {
  mockToggle.mockClear();
  mockIsFavorite.mockClear();
  mockNavigation.navigate.mockClear();
  mockNavigation.goBack.mockClear();
  mockLoadFirst.mockClear();
  mockLoadNext.mockClear();
};

// Test dummy para que Jest no falle al ejecutar este archivo
describe('Test utilities', () => {
  it('should export mock utilities', () => {
    expect(mockTheme).toBeDefined();
    expect(mockCharacter).toBeDefined();
    expect(mockCharacters).toBeDefined();
    expect(clearMocks).toBeDefined();
  });
});
