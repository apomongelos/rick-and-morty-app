import { Character } from '@modules/characters/domain/Character';

export function isFavorite(favs: Character[], id: number): boolean {
  return favs.some(c => c.id === id);
}
