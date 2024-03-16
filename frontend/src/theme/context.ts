import { createContext } from 'react';

import { ThemeVariant } from './theme';

export type ThemeContextValue = {
  variant: ThemeVariant;
  switchTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextValue>({
  variant: 'light',
  switchTheme: () => {},
});
