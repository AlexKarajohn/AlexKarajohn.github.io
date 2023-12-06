import Box from "@mui/material/Box";
import { PersonInfo } from "./components/PersonInfo/PersonInfo";
import { Skills } from "./components/Skills/Skills";

import { Recommendations } from "./components/Recommendations/Recommendations";

import { Socials } from "./components/Socials/Socials";
import { Grid } from "@mui/material";

export const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",

        flexDirection: "row",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        padding: "25px",

        overflow: "auto",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} order={1}>
          <PersonInfo />
        </Grid>
        <Grid item xs={12} sm={8} md={4} order={2}>
          <Skills />
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={8}
          sm={12}
          xs={12}
          order={{ xl: 3, lg: 3, md: 3, sm: 4, xs: 3 }}
        >
          <Recommendations />
        </Grid>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={4}
          xs={12}
          order={{ xl: 4, lg: 4, md: 4, sm: 3, xs: 4 }}
        >
          <Socials />
        </Grid>
      </Grid>
    </Box>
  );
};
