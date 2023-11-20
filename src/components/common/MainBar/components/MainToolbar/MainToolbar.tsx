import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useMainBarContext } from "../../context/utils/useMainDrawerContext";

export const MainToolBar = () => {
  const { setDrawerValue } = useMainBarContext();

  const openDrawer = () => setDrawerValue(true);

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton onClick={openDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h5">Alexandros Karagiannis</Typography>
    </Toolbar>
  );
};
