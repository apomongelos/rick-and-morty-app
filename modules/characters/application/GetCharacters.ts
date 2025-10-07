import { Page } from '@shared/domain/Page';

import { Character } from '../domain/Character';
import { CharacterRepository } from '../domain/CharacterRepository';

export const getCharacters =
  (repo: CharacterRepository) =>
  async (page = 1): Promise<Page<Character>> => {
    return repo.getCharacters(page);
  };
