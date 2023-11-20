import { useContext } from "react";
import { mainBarContext } from "../mainBarContext";

export const useMainBarContext = () => {
  const context = useContext(mainBarContext);
  if (context === undefined) {
    throw new Error("usemainBarContext must be within MainDrawerProvider");
  }

  return context;
};
