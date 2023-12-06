import { Avatar, Box, Typography } from "@mui/material";
import { FC } from "react";
import { RecommendationQuote } from "src/types/types";
import { stringAvatar } from "src/util/common/stringToAvatar";

interface RecommendationProps {
  recommendation: RecommendationQuote;
}

export const Recommendation: FC<RecommendationProps> = ({ recommendation }) => {
  return (
    <Box sx={{ flexGrow: 2 }}>
      <Box display="flex" justifyItems={"center"} alignItems={"center"} gap={1}>
        <Avatar {...stringAvatar(recommendation.by)} />{" "}
        <Box
          display="flex"
          flexDirection={"column"}
          justifyItems={"center"}
          alignItems={"flex-start"}
          gap={0}
        >
          <Typography variant="h6">{recommendation.by}</Typography>
          <Box>
            <Typography variant="caption" sx={{ opacity: "70%" }}>
              {recommendation.position}
            </Typography>{" "}
            -{" "}
            <Typography variant="caption" sx={{ opacity: "70%" }}>
              {recommendation.relation}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection={"column"}
        justifyItems={"center"}
        gap={0}
      >
        <Typography variant="body1">"{recommendation.quote}"</Typography>
      </Box>
    </Box>
  );
};
