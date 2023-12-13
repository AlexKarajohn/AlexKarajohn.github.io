import { Avatar, Card, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { personalInformation } from "src/assets/content/personalInformation";
import alexKaraImage from "src/assets/alexkara.jpg";

export const PersonInfo = () => {
  return (
    <Card>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          alt={personalInformation.name + "-picture"}
          src={alexKaraImage}
          variant="rounded"
          sx={{ width: "100px", height: "100px" }}
        />
        <Box>
          <Typography variant="h3">{personalInformation.name}</Typography>
          <Typography variant="h6">{personalInformation.title}</Typography>
        </Box>
      </Box>

      <Typography variant="body1">{personalInformation.description}</Typography>
    </Card>
  );
};
