import React, { createContext, useMemo } from 'react';

import { getColors } from './colors';
import type { Theme, ThemeContextValue } from './types';
import { defaultTypography } from './typography';

type Props = {
  children: React.ReactNode;
};

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const theme: Theme = useMemo(
    () => ({
      colors: getColors(),
      typography: defaultTypography,
    }),
    []
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
