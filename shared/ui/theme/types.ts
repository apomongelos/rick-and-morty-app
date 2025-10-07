import { ColorRoles } from './colors';
import { TypographyScale } from './typography';

export type Theme = Readonly<{
  colors: ColorRoles;
  typography: TypographyScale;
}>;

export type ThemeContextValue = Readonly<{
  theme: Theme;
}>;
