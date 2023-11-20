import { createContext } from "react";
import { DrawerMenuItem } from "src/types/types";

interface MainBarContext {
  isDrawerOpen: boolean;
  setDrawerValue: (v: boolean) => void;
  listItems: DrawerMenuItem[];
  title: string;
}

export const mainBarContext = createContext<MainBarContext | undefined>(
  undefined,
);
