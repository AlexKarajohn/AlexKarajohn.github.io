import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { FC } from "react";
import { DrawerMenu } from "./components/DrawerMenu/DrawerMenu";
import { useMainBarContext } from "../../context/utils/useMainDrawerContext";
import { drawerClasses } from "@mui/material/Drawer";
export const MainDrawer: FC = () => {
  const { isDrawerOpen, setDrawerValue } = useMainBarContext();

  const closeDrawer = () => setDrawerValue(false);
  const openDrawer = () => setDrawerValue(true);

  return (
    <nav>
      <SwipeableDrawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={closeDrawer}
        onOpen={openDrawer}
        sx={{
          [`& .${drawerClasses.paper}`]: {
            boxSizing: "border-box",
            width: { xs: "100%", sm: "40%", md: "400px" },
          },
        }}
      >
        <DrawerMenu />
      </SwipeableDrawer>
    </nav>
  );
};
