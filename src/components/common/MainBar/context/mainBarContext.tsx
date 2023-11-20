import { FC, ReactNode, createContext, useState } from "react";
import { DrawerMenuConfiguration, DrawerMenuItem } from "src/types/types";

interface MainBarContext {
  isDrawerOpen: boolean;
  setDrawerValue: (v: boolean) => void;
  listItems: DrawerMenuItem[];
  title: string;
}

export const mainBarContext = createContext<MainBarContext | undefined>(
  undefined,
);

export interface MainBarContextProps {
  children?: ReactNode;
  menuConfiguration: DrawerMenuConfiguration;
}

export const MainBarProvider: FC<MainBarContextProps> = ({
  children,
  menuConfiguration,
}) => {
  const [mainDrawerState, setMainDrawerState] = useState<boolean>(false);

  const setDrawerValue = (v: boolean) => {
    console.log("Seetting to " + v);
    setMainDrawerState(v);
  };

  return (
    <mainBarContext.Provider
      value={{
        isDrawerOpen: mainDrawerState,
        setDrawerValue,
        listItems: menuConfiguration.list,
        title: menuConfiguration.title,
      }}
    >
      {children}
    </mainBarContext.Provider>
  );
};
