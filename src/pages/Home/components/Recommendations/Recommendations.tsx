import { Card } from "@mui/material";
import { recommendationsList } from "src/components/common/MainBar/asset/list";
import { Recommendation } from "./components/Recommendation/Recommendation";
import { FC } from "react";

export const Recommendations: FC = () => {
  return (
    <Card
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",

        gap: 2,
      }}
    >
      {recommendationsList.map((recommendation, index) => {
        return (
          <Recommendation
            key={index + recommendation.by}
            recommendation={recommendation}
          />
        );
      })}
    </Card>
  );
};
