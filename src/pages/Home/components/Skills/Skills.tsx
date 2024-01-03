import { Skillbar } from "src/components/common/Skillbar/Skillbar";
import { Box, Button, Card, Divider, Link, Typography } from "@mui/material";
import { RouteList, skillList } from "src/components/common/MainBar/asset/list";

export const Skills = () => {
  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,

        alignItems: "center",
      }}
    >
      <Divider>
        <Typography variant="h5">Core Skills</Typography>
      </Divider>
      <Box>
        {skillList.map((skill, index) => (
          <Skillbar key={index + skill.name} skill={skill} />
        ))}
      </Box>
      <Link href={RouteList.find((item) => item.text === "Skills")?.path}>
        <Button variant="outlined">See more</Button>
      </Link>
    </Card>
  );
};
