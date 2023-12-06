import AppBar from "@mui/material/AppBar";
import { MainDrawer } from "./components/MainDrawer/MainDrawer";
import { MainToolBar } from "./components/MainToolBar/MainToolBar";
import { MainBarProvider } from "./context/MainBarProvider";
import { menuConfiguration } from "./asset/list";

export const MainBar = () => {
  return (
    <MainBarProvider menuConfiguration={menuConfiguration}>
      <AppBar position="sticky">
        <MainToolBar />
      </AppBar>
      <MainDrawer />
    </MainBarProvider>
  );
};
