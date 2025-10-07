import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CharacterDetailScreen from '@modules/characters/ui/screens/CharacterDetailScreen';
import CharactersScreen from '@modules/characters/ui/screens/CharactersScreen';
import FavoritesScreen from '@modules/favorites/ui/screens/FavoritesScreen';

import { AppText } from '@shared/ui/atoms/AppText';
import { useTheme } from '@shared/ui/theme/useTheme';

import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<RootStackParamList>();

function TabsNav() {
  const { theme } = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarLabelStyle: {
          fontFamily: theme.typography.labelMedium.fontFamily,
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="Characters"
        component={CharactersScreen}
        options={{
          title: 'Personajes',
          tabBarIcon: ({ focused, color }) => (
            <AppText style={{ fontSize: 20, color }}>
              {focused ? '🛸' : '👽'}
            </AppText>
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarIcon: ({ focused, color }) => (
            <AppText style={{ fontSize: 20, color }}>
              {focused ? '⭐' : '🌟'}
            </AppText>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.onPrimary,
        headerTitleStyle: {
          fontFamily: theme.typography.headlineSmall.fontFamily,
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={TabsNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={{
          title: '🚀 Detalle del Personaje',
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.onSurface,
          headerTitleStyle: {
            fontFamily: theme.typography.headlineSmall.fontFamily,
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.onSurface,
          },
        }}
      />
    </Stack.Navigator>
  );
}
