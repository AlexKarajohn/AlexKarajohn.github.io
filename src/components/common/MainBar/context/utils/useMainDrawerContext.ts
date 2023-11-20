import { useContext } from "react";
import { mainBarContext } from "../mainBarContext";

export const useMainBarContextErrorMessage =
  "useMainBarContext must be within MainDrawerProvider";

export const useMainBarContext = () => {
  const context = useContext(mainBarContext);
  if (context === undefined) {
    throw new Error(useMainBarContextErrorMessage);
  }

  return context;
};
