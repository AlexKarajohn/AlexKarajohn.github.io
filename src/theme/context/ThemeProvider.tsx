import { FC, ReactNode, useState, useMemo } from "react";
import { COLOR_MODE, themeContext } from "./themeContext";
import { themeCreator } from "src/theme/themeCreator";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";

export interface ThemeProviderProps {
  children?: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<COLOR_MODE>(() => {
    const mode = localStorage.getItem("colorMode");
    const initalMode = mode === "dark" ? COLOR_MODE.DARK : COLOR_MODE.LIGHT;
    return initalMode;
  });

  const theme = useMemo(() => themeCreator(mode), [mode]);

  const setModeWithPersistence = (mode: COLOR_MODE) => {
    localStorage.setItem("colorMode", mode);
    setMode(mode);
  };

  return (
    <themeContext.Provider value={{ mode, setMode: setModeWithPersistence }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </themeContext.Provider>
  );
};
