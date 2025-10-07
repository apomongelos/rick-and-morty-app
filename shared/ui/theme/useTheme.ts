import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue } from './types';

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within <ThemeProvider>');
  }
  return ctx;
};
