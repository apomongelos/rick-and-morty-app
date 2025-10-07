import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FavoritesProvider } from '@modules/favorites/infrastructure/FavoritesContext';

import { ThemeProvider } from '@shared/ui/theme/ThemeProvider';

import { RootNavigator } from './navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
