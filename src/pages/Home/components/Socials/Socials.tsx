import { Box, Card, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { personalInformation } from "src/assets/content/personalInformation";
import { socialLinks } from "src/assets/content/socials";
import linkedInLogo from "src/assets/LI-Logo.png";
import githubDarkLogo from "src/assets/GitHub_Logo.png";
import githubLightLogo from "src/assets/GitHub_Logo_White.png";

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
            src={linkedInLogo}
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
              theme.palette.mode === "dark" ? githubLightLogo : githubDarkLogo
            }
            width="90px"
          />
        </IconButton>
      </Box>
    </Card>
  );
};
