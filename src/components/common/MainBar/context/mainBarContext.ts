import { createContext } from "react";
import { ListItem } from "src/types/types";

interface MainBarContext {
  isDrawerOpen: boolean;
  setDrawerValue: (v: boolean) => void;
  list: ListItem[];
  title: string;
}

export const mainBarContext = createContext<MainBarContext | undefined>(
  undefined,
);
