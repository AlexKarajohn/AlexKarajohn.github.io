import { Box, BoxProps, Typography } from "@mui/material";
import { FC } from "react";
import { Skill, Range } from "src/types/types";
import { styled } from "@mui/material/styles";

interface SkillbarProps {
  skill: Skill;
}

const StyledBox = styled(Box)<BoxProps & { level: Range<0, 101> }>(
  ({ theme, level }) => ({
    backgroundColor: theme.palette.primary.main,
    width: "150px",
    maxWidth: "150px",
    height: "20px",
    backgroundImage: `linear-gradient(90deg,  ${theme.palette.primary.main} 0 ${level}%,  ${theme.palette.primary.light} ${level}% )`,
    borderRadius: "4px",
    border: `1px solid ${theme.palette.primary.dark}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
);

export const Skillbar: FC<SkillbarProps> = ({ skill }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignContent: "center",
        justifyContent: "space-between",
        width: "250px",
      }}
    >
      <Typography variant="body1">{skill.name}</Typography>
      <StyledBox level={skill.level} data-testid="styledBox">
        {skill?.years && skill.years > 0 && (
          <Typography variant="caption">
            {skill?.years}+ year{skill?.years > 1 ? "s" : ""}
          </Typography>
        )}
      </StyledBox>
    </Box>
  );
};
