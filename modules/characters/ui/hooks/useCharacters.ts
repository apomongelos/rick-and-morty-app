import { useCallback, useRef, useState } from 'react';

import { getCharacters } from '@modules/characters/application/GetCharacters';
import { Character } from '@modules/characters/domain/Character';
import { HttpCharacterRepository } from '@modules/characters/infrastructure/HttpCharacterRepository';

const repo = new HttpCharacterRepository();
const getCharactersUseCase = getCharacters(repo);

export function useCharacters() {
  const [items, setItems] = useState<Character[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const pageRef = useRef<number>(1);

  const loadCharacters = useCallback(
    async (pageNumber: number, reset = false) => {
      try {
        if (reset) {
          setLoading(true);
          pageRef.current = 1;
        } else {
          setLoadingMore(true);
        }

        setError(undefined);
        const res = await getCharactersUseCase(pageNumber);

        if (reset) {
          setItems(res.results);
        } else {
          setItems(prev => {
            const seen = new Set(prev.map(c => c.id));
            const merged = [...prev];
            for (const c of res.results) if (!seen.has(c.id)) merged.push(c);
            return merged;
          });
        }

        const nextPageFromUrl = res.info.next
          ? parseInt(new URL(res.info.next).searchParams.get('page') || '1')
          : null;

        pageRef.current = nextPageFromUrl ?? pageNumber + 1;
        setHasNextPage(!!res.info.next);
      } catch (e) {
        setError((e as Error).message || 'Error desconocido');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    []
  );

  const loadNext = useCallback(() => {
    if (hasNextPage && !loadingMore) {
      return loadCharacters(pageRef.current);
    }
  }, [hasNextPage, loadingMore, loadCharacters]);

  const loadFirst = useCallback(() => {
    return loadCharacters(1, true);
  }, [loadCharacters]);

  return {
    items,
    loading,
    loadingMore,
    error,
    hasNextPage,
    loadFirst,
    loadNext,
  };
}
