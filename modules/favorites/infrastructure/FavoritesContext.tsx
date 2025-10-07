import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { Character } from '@modules/characters/domain/Character';

import { isFavorite } from '../application/IsFavorite';

import { favoritesReducer } from './favoritesReducer';

type Ctx = {
  favorites: Character[];
  toggle: (c: Character) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesCtx = createContext<Ctx | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, { items: [] });

  const value = useMemo<Ctx>(
    () => ({
      favorites: state.items,
      toggle: c => dispatch({ type: 'TOGGLE', payload: c }),
      isFavorite: id => isFavorite(state.items, id),
    }),
    [state.items]
  );

  return (
    <FavoritesCtx.Provider value={value}>{children}</FavoritesCtx.Provider>
  );
}

export function useFavorites(): Ctx {
  const ctx = useContext(FavoritesCtx);
  if (!ctx)
    throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
