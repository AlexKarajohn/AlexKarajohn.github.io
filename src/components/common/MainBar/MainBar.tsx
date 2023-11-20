import AppBar from "@mui/material/AppBar";
import { MainDrawer } from "./components/MainDrawer/MainDrawer";
import { MainToolBar } from "./components/MainToolbar/MainToolbar";
import { MainBarProvider } from "./context/MainBarProvider";
import { menuConfiguration } from "./asset/list";

export const MainBar = () => {
  return (
    <MainBarProvider menuConfiguration={menuConfiguration}>
      <AppBar position="static">
        <MainToolBar />
      </AppBar>
      <MainDrawer />
    </MainBarProvider>
  );
};
