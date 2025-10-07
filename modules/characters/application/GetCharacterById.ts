import { Character } from '../domain/Character';
import { CharacterRepository } from '../domain/CharacterRepository';

export const getCharacterById =
  (repo: CharacterRepository) =>
  async (id: number): Promise<Character> => {
    return repo.getCharacterById(id);
  };
