export type LockupVariant = 'vertical' | 'horizontal' | 'emblem' | 'wordmark';

export type CanvasTheme = 'ivory' | 'inverted' | 'transparent';

export type NeedleStyle = 'couture-arc' | 'tailor-loop' | 'symmetrical';

export interface LogoConfig {
  variant: LockupVariant;
  theme: CanvasTheme;
  needleStyle: NeedleStyle;
  showGuides: boolean;
  scale: number;
}

export const BRAND_COLORS = {
  emerald: '#1F4D3A',
  gold: '#C9A24B',
  ivory: '#FAF6EE',
} as const;

export interface ColorSpec {
  name: string;
  role: string;
  hex: string;
  rgb: string;
  cmyk: string;
  pantone: string;
}

export const BRAND_PALETTE: ColorSpec[] = [
  {
    name: 'Deep Emerald Green',
    role: 'Primary Identity & Badge Ground',
    hex: '#1F4D3A',
    rgb: '31, 77, 58',
    cmyk: '80, 42, 72, 45',
    pantone: 'Pantone 5535 C',
  },
  {
    name: 'Artisanal Gold',
    role: 'Inner Ring, Stylized Leaf, Needle & Sub-label',
    hex: '#C9A24B',
    rgb: '201, 162, 75',
    cmyk: '21, 33, 85, 4',
    pantone: 'Pantone 7556 C',
  },
  {
    name: 'Silk Ivory',
    role: 'Primary Canvas & Contrast Background',
    hex: '#FAF6EE',
    rgb: '250, 246, 238',
    cmyk: '1, 2, 6, 0',
    pantone: 'Pantone Warm Gray 1 C',
  },
];
