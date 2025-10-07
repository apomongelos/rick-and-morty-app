import { Character } from '@modules/characters/domain/Character';

import { toggleFavorite } from '../application/ToggleFavorite';

export type FavoritesState = { items: Character[] };
export type FavoritesAction = { type: 'TOGGLE'; payload: Character };

export function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE':
      return { items: toggleFavorite(state.items, action.payload) };
    default:
      return state;
  }
}
