import { Page } from '@shared/domain/Page';

import { Character } from '../domain/Character';
import { CharacterRepository } from '../domain/CharacterRepository';

const BASE = 'https://rickandmortyapi.com/api';

export class HttpCharacterRepository implements CharacterRepository {
  async getCharacters(page = 1): Promise<Page<Character>> {
    const res = await fetch(`${BASE}/character?page=${page}`);
    if (!res.ok) throw new Error('Error al cargar personajes');
    return await res.json();
  }

  async getCharacterById(id: number): Promise<Character> {
    const res = await fetch(`${BASE}/character/${id}`);
    if (!res.ok) throw new Error('Personaje no encontrado');
    return await res.json();
  }
}
