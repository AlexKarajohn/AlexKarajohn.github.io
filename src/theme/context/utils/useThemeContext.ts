import { useContext } from "react";
import { themeContext } from "../themeContext";

export const useThemeContextError =
  "useThemeContext must be within MainDrawerProvider";

export const useThemeContext = () => {
  const context = useContext(themeContext);
  if (context === undefined) {
    throw new Error(useThemeContextError);
  }

  return context;
};
