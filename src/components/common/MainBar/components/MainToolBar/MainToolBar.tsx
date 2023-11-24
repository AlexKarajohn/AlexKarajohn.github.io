import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useMainBarContext } from "../../context/utils/useMainDrawerContext";

export const name = "Alexandros Karagiannis";
export const title = "Senior Frontend Developer";
export const menuIconButtonTestId = "MenuIconButton";

export const MainToolBar = () => {
  const { setDrawerValue } = useMainBarContext();

  const openDrawer = () => setDrawerValue(true);

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton onClick={openDrawer} data-testid={menuIconButtonTestId}>
        <MenuIcon />
      </IconButton>
      <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
        <Typography variant="h5" color="AppWorkspace">
          {name}
        </Typography>
        <Typography variant="body2" color="white">
          {title}
        </Typography>
      </Box>
    </Toolbar>
  );
};
