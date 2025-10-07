import { Page } from '@shared/domain/Page';

import { Character } from './Character';

export interface CharacterRepository {
  getCharacters(page?: number): Promise<Page<Character>>;
  getCharacterById(id: number): Promise<Character>;
}
