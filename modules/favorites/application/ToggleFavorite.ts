import { Character } from '@modules/characters/domain/Character';

export function toggleFavorite(
  favs: Character[],
  char: Character
): Character[] {
  const exists = favs.some(c => c.id === char.id);
  return exists ? favs.filter(c => c.id !== char.id) : [char, ...favs];
}
