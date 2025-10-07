import { useCallback, useEffect, useState } from 'react';

import { getCharacterById } from '@modules/characters/application/GetCharacterById';
import { Character } from '@modules/characters/domain/Character';
import { HttpCharacterRepository } from '@modules/characters/infrastructure/HttpCharacterRepository';

const repo = new HttpCharacterRepository();
const getCharacterByIdUseCase = getCharacterById(repo);

export function useCharacterDetail(id: number) {
  const [data, setData] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  const loadCharacter = useCallback(async () => {
    if (!id || id <= 0) {
      setError('ID de personaje inválido');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(undefined);
      const character = await getCharacterByIdUseCase(id);
      setData(character);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Error desconocido';
      setError(errorMessage);
      setData(undefined);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void loadCharacter();
  }, [loadCharacter]);

  const retry = useCallback(() => {
    void loadCharacter();
  }, [loadCharacter]);

  return {
    data,
    loading,
    error,
    retry,
  };
}
