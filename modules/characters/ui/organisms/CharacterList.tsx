import React, { useCallback, useMemo, useRef } from 'react';

import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import { AppText } from 'shared/ui/atoms/AppText';

import type { Character } from 'modules/characters/domain/Character';
import {
  CHARACTER_ROW_HEIGHT,
  CharacterCard,
} from 'modules/characters/ui/molecules/CharacterCard';

type Props = {
  data: Character[];
  loading: boolean;
  error?: string;
  onRetry: () => void;
  onPressItem: (id: number) => void;
  onEndReached?: () => void;
  loadingMore?: boolean;
};

export const CharacterList: React.FC<Props> = ({
  data,
  loading,
  error,
  onRetry,
  onPressItem,
  onEndReached,
  loadingMore,
}) => {
  const keyExtractor = useCallback((c: Character) => String(c.id), []);

  const renderItem: ListRenderItem<Character> = useCallback(
    ({ item }) => <CharacterCard character={item} onPress={onPressItem} />,
    [onPressItem]
  );

  const lastEndCall = useRef(0);
  const handleEndReached = useCallback(() => {
    if (!onEndReached || loadingMore) return;
    const now = Date.now();
    if (now - lastEndCall.current < 800) return;
    lastEndCall.current = now;
    onEndReached();
  }, [onEndReached, loadingMore]);

  // Incluir separador en el cálculo del layout
  const ITEM_HEIGHT_WITH_SEPARATOR = CHARACTER_ROW_HEIGHT + 12;

  const getItemLayout = useCallback(
    (_: ArrayLike<Character> | null | undefined, index: number) => ({
      length: ITEM_HEIGHT_WITH_SEPARATOR,
      offset: ITEM_HEIGHT_WITH_SEPARATOR * index,
      index,
    }),
    [ITEM_HEIGHT_WITH_SEPARATOR]
  );

  const ListFooter = useMemo(
    () => (loadingMore ? <ActivityIndicator style={styles.footer} /> : null),
    [loadingMore]
  );

  const refreshControl = useMemo(
    () => <RefreshControl refreshing={loading} onRefresh={onRetry} />,
    [loading, onRetry]
  );

  if (loading && data.length === 0) {
    return <ActivityIndicator style={styles.center} testID="loading" />;
  }

  if (error && data.length === 0) {
    return (
      <View style={styles.errorBox}>
        <AppText style={styles.errorText}>{error}</AppText>
        <AppText onPress={onRetry} style={styles.retry}>
          Reintentar
        </AppText>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      ItemSeparatorComponent={ItemSeparator}
      onEndReachedThreshold={0.3}
      onEndReached={handleEndReached}
      ListFooterComponent={ListFooter}
      refreshControl={refreshControl}
      initialNumToRender={10}
      maxToRenderPerBatch={6}
      windowSize={5}
      updateCellsBatchingPeriod={100}
      removeClippedSubviews={true}
      scrollEventThrottle={16}
    />
  );
};

const ItemSeparator = React.memo(() => <View style={styles.separator} />);
ItemSeparator.displayName = 'ItemSeparator';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'crimson',
    marginBottom: 12,
    textAlign: 'center',
  },
  retry: {
    color: 'royalblue',
    fontWeight: 'bold',
  },
  footer: {
    marginVertical: 16,
  },
  separator: {
    height: 12,
  },
});
