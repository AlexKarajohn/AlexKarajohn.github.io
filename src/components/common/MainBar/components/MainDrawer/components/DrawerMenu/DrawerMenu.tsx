import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { useMainBarContext } from "src/components/common/MainBar/context/utils/useMainDrawerContext";
import { ListItem } from "./components/ListItem/ListItem";

export const DrawerMenu: FC = () => {
  const { listItems, title } = useMainBarContext();
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {title}
      </Typography>
      <Divider />
      <List>
        {listItems.length > 0 &&
          listItems.map((item) => <ListItem key={item.id} item={item} />)}
      </List>
    </Box>
  );
};
