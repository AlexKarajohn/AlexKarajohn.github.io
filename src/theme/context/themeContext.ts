import { createContext } from "react";

export enum COLOR_MODE {
  LIGHT = "light",
  DARK = "dark",
}

interface ThemeContext {
  mode: COLOR_MODE;
  setMode: (v: COLOR_MODE) => void;
}

export const themeContext = createContext<ThemeContext | undefined>(undefined);
