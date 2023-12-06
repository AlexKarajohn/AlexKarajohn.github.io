import { Box, Card, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { personalInformation } from "src/assets/content/personalInformation";
import { socialLinks } from "src/assets/content/socials";

export const Socials: FC = () => {
  const theme = useTheme();
  const matchesBetweenMdSm = useMediaQuery(
    theme.breakpoints.between("sm", "md"),
  );
  return (
    <Card
      sx={{
        flexGrow: 2,
        display: "flex",
        height: "100%",
        flexDirection: matchesBetweenMdSm ? "column" : "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Box component={NavLink} to={socialLinks.linkedIn}>
        <IconButton>
          <img
            src={"src/assets/LI-Logo.png"}
            width="90px"
            data-testid="linkedin-img"
            alt={personalInformation.name + "-linkedin"}
          />
        </IconButton>
      </Box>
      <Box component={NavLink} to={socialLinks.github}>
        <IconButton>
          <img
            src={
              theme.palette.mode === "dark"
                ? "src/assets/GitHub_Logo_White.png"
                : "src/assets/GitHub_Logo.png"
            }
            width="90px"
          />
        </IconButton>
      </Box>
    </Card>
  );
};
