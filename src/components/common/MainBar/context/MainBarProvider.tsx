import { FC, ReactNode, useState } from "react";
import { DrawerMenuConfiguration } from "src/types/types";
import { mainBarContext } from "./mainBarContext";

interface MainBarContextProps {
  children?: ReactNode;
  menuConfiguration: DrawerMenuConfiguration;
}

export const MainBarProvider: FC<MainBarContextProps> = ({
  children,
  menuConfiguration,
}) => {
  const [mainDrawerState, setMainDrawerState] = useState<boolean>(false);

  const setDrawerValue = (value: boolean) => {
    setMainDrawerState(value);
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
