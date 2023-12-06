import { createTheme } from "@mui/material/styles";
import { COLOR_MODE } from "./context/themeContext";

export const themeCreator = (mode: COLOR_MODE) =>
  createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            height: "100vh",
          },
          ["#root"]: {
            height: "100%",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: { padding: "25px" },
        },
      },
    },
    palette: {
      mode: mode === COLOR_MODE.LIGHT ? "light" : "dark",
    },
  });
