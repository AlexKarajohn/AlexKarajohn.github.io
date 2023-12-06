import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useMainBarContext } from "../../context/utils/useMainDrawerContext";
import { menuIconButtonTestId } from "./constants";
import { ColorModeSwitch } from "./components/ColorModeSwitch/ColorModeSwitch";
import { personalInformation } from "src/assets/content/personalInformation";

export const MainToolBar = () => {
  const { setDrawerValue } = useMainBarContext();

  const openDrawer = () => setDrawerValue(true);

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton onClick={openDrawer} data-testid={menuIconButtonTestId}>
        <MenuIcon />
      </IconButton>
      <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
        <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
          <ColorModeSwitch />
        </Box>
        <Box display={"flex"} flexDirection={"column"} alignItems={"end"}>
          <Typography variant="h5" color="AppWorkspace">
            {personalInformation.name}
          </Typography>
          <Typography variant="body2" color="white">
            {personalInformation.title}
          </Typography>
        </Box>
      </Box>
    </Toolbar>
  );
};
