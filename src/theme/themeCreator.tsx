import { createTheme } from "@mui/material/styles";
import { COLOR_MODE } from "./context/themeContext";

export const themeCreator = (mode: COLOR_MODE) =>
  createTheme({
    palette: {
      mode: mode === COLOR_MODE.LIGHT ? "light" : "dark",
    },
  });
