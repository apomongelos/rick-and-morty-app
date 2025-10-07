// Paleta semántica light theme con colores de Rick and Morty

export interface ColorRoles {
  // Base / Superficies
  readonly background: string;
  readonly onBackground: string;
  readonly surface: string;
  readonly onSurface: string;
  readonly surfaceVariant: string;
  readonly onSurfaceVariant: string;

  // Primarios
  readonly primary: string;
  readonly onPrimary: string;
  readonly primaryContainer: string;
  readonly onPrimaryContainer: string;

  // Secundarios
  readonly secondary: string;
  readonly onSecondary: string;
  readonly secondaryContainer: string;
  readonly onSecondaryContainer: string;

  // Terciarios (opcional para acentos)
  readonly tertiary: string;
  readonly onTertiary: string;
  readonly tertiaryContainer: string;
  readonly onTertiaryContainer: string;

  // Outline / Dividers
  readonly outline: string;
  readonly outlineVariant: string;

  // Estados
  readonly success: string;
  readonly onSuccess: string;
  readonly warning: string;
  readonly onWarning: string;
  readonly error: string;
  readonly onError: string;
  readonly info: string;
  readonly onInfo: string;

  // Elevaciones rápidas (superficies elevadas)
  readonly surface1: string;
  readonly surface2: string;
  readonly surface3: string;
}

// Paleta Rick and Morty
const rickAndMortyColors = {
  portalGreen: '#88e23b', // Verde portal principal
  acidYellow: '#ebe480', // Amarillo ácido
  spaceBlue: '#043c6e', // Azul espacial profundo
  alienGreen: '#60a85f', // Verde alienígena
  labGray: '#a6cccc', // Gris laboratorio
  toxicGreen: '#6b7132', // Verde tóxico oscuro
} as const;

// LIGHT THEME - Rick and Morty
export const lightColors: ColorRoles = {
  // Fondo neutro con toque de laboratorio
  background: '#FFFFFF',
  onBackground: rickAndMortyColors.spaceBlue,

  // Superficie con gris laboratorio muy sutil
  surface: '#F8FAFA',
  onSurface: rickAndMortyColors.spaceBlue,
  surfaceVariant: rickAndMortyColors.labGray,
  onSurfaceVariant: rickAndMortyColors.toxicGreen,

  // Primary: Verde portal (característico de la serie)
  primary: rickAndMortyColors.portalGreen,
  onPrimary: '#FFFFFF',
  primaryContainer: '#E8F5E8',
  onPrimaryContainer: rickAndMortyColors.toxicGreen,

  // Secondary: Azul espacial para elementos secundarios
  secondary: rickAndMortyColors.spaceBlue,
  onSecondary: '#FFFFFF',
  secondaryContainer: '#E3F2FD',
  onSecondaryContainer: rickAndMortyColors.spaceBlue,

  // Tertiary: Verde alienígena para acentos
  tertiary: rickAndMortyColors.alienGreen,
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#E8F5E8',
  onTertiaryContainer: rickAndMortyColors.toxicGreen,

  // Outlines con colores más neutros
  outline: '#79747E',
  outlineVariant: rickAndMortyColors.labGray,

  // Estados con colores Rick and Morty
  success: rickAndMortyColors.alienGreen,
  onSuccess: '#FFFFFF',
  warning: rickAndMortyColors.acidYellow,
  onWarning: rickAndMortyColors.toxicGreen,
  error: '#D32F2F',
  onError: '#FFFFFF',
  info: rickAndMortyColors.spaceBlue,
  onInfo: '#FFFFFF',

  // Elevaciones con tintes sutiles
  surface1: '#FAFBFB',
  surface2: '#F5F7F7',
  surface3: '#F0F3F3',
} as const;

export const getColors = (): ColorRoles => lightColors;
