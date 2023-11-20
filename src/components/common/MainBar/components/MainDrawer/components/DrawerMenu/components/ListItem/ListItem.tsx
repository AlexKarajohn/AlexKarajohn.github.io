import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemMui from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import { useMainBarContext } from "src/components/common/MainBar/context/utils/useMainDrawerContext";
import { FC, useState } from "react";
import { DrawerMenuItem } from "src/types/types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

interface ListItemProps {
  item: DrawerMenuItem;
  isChild?: boolean;
}

export const ListItem: FC<ListItemProps> = ({ item, isChild }) => {
  const { setDrawerValue } = useMainBarContext();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeDrawer = () => setDrawerValue(false);

  return (
    <>
      <ListItemMui
        key={item.id}
        disablePadding
        sx={{ display: "flex", alignItems: "stretch", minWidth: 0 }}
        // component={item.route ? "a" : "a"}
        // href={item.route ? item.route : "undefined"}
      >
        <ListItemButton
          onClick={() => {
            closeDrawer();
          }}
          sx={{
            display: "flex",
            gap: 1,
            paddingLeft: isChild ? 0 : undefined,
            minWidth: 0,
          }}
        >
          {item.icon ? (
            <ListItemIcon sx={{ maxWidth: "24px", minWidth: "0px" }}>
              {item.icon}
            </ListItemIcon>
          ) : (
            <Box sx={{ minWidth: "24px" }} />
          )}
          <ListItemText
            primary={item.text}
            sx={{
              textWrap: "wrap",
              minWidth: 0,
              overflowWrap: "break-word",
            }}
          />
        </ListItemButton>

        {item.children && item.children.length > 0 && (
          <ListItemButton
            onClick={handleClick}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "50px",
              minWidth: "50px",
            }}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        )}
      </ListItemMui>
      {item.children && item.children.length > 0 && (
        <Collapse
          in={open}
          timeout="auto"
          unmountOnExit
          sx={{ paddingLeft: 0, minWidth: 0 }}
        >
          <Box display="flex" sx={{ paddingLeft: 0, minWidth: 0 }}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ minWidth: "20px" }}
            />
            <Box width="100%" sx={{ marginLeft: "0" }}>
              {item?.children.map((item) => {
                return <ListItem key={item.id} item={item} isChild={true} />;
              })}
            </Box>
          </Box>
        </Collapse>
      )}
    </>
  );
};
