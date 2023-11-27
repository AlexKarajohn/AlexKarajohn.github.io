import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItemMui from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import { useMainBarContext } from "src/components/common/MainBar/context/utils/useMainDrawerContext";
import { FC, useState } from "react";
import type { ListItem } from "src/types/types";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { routeCreator } from "./util/routeCreator";
import { NavLink, useMatch } from "react-router-dom";

export interface ListMenuItemProps {
  item: ListItem;
  isChild?: boolean;
  parentUrl?: string;
}

export const ListMenuItem: FC<ListMenuItemProps> = ({
  item,
  isChild,
  parentUrl,
}) => {
  const { setDrawerValue } = useMainBarContext();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const closeDrawer = () => setDrawerValue(false);

  const currentPath = routeCreator(parentUrl, item.path);
  const isActiveLink = useMatch(currentPath || "");
  const primaryText = isActiveLink ? (
    <b data-testid="bold-text">{item.text}</b>
  ) : (
    item.text
  );

  return (
    <>
      <ListItemMui
        key={item.id}
        disablePadding
        sx={{ display: "flex", alignItems: "stretch", minWidth: 0 }}
      >
        <ListItemButton
          onClick={closeDrawer}
          component={item.path ? NavLink : "div"}
          to={currentPath}
          sx={{
            display: "flex",
            gap: 1,
            paddingLeft: isChild ? 1 : undefined,
            minWidth: 0,
          }}
        >
          {item.icon ? (
            <ListItemIcon sx={{ maxWidth: 3 * 8 + "px", minWidth: 0 }}>
              {item.icon}
            </ListItemIcon>
          ) : (
            <Box sx={{ minWidth: 3 * 8 + "px" }} />
          )}
          <ListItemText
            primary={primaryText}
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
              maxWidth: 6 * 8 + "px",
              minWidth: 6 * 8 + "px",
            }}
            data-testid="expand"
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
              sx={{ minWidth: 3 * 8 + "px" }}
            />
            <Box width="100%" sx={{ marginLeft: "0" }}>
              {item.children.map((childrenItem: ListItem) => {
                const childProps = {
                  item: childrenItem,
                  isChild: true,
                  parentUrl: currentPath,
                };

                return <ListMenuItem key={childrenItem.id} {...childProps} />;
              })}
            </Box>
          </Box>
        </Collapse>
      )}
    </>
  );
};
