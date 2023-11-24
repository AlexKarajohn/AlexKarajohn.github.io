import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { useMainBarContext } from "src/components/common/MainBar/context/utils/useMainDrawerContext";
import { ListMenuItem } from "./components/ListMenuItem/ListMenuItem";

export const DrawerMenu: FC = () => {
  const { list, title } = useMainBarContext();

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {title}
      </Typography>
      <Divider />
      <List>
        {list.length > 0 &&
          list.map((item) => <ListMenuItem key={item.id} item={item} />)}
      </List>
    </Box>
  );
};
