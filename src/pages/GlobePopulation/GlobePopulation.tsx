import { useEffect } from "react";
import dataD from "./data/data.json";
import { globeChart, yearPlot } from "./utils/globeChart";

const id = "globeChart";

export const GlobePopulation = () => {
  useEffect(() => {
    const formattedData = dataD as unknown;
    const chart = new globeChart({
      data: formattedData as yearPlot[],
      id,
      entireHeight: 600,
      entireWidth: 800,
    });

    return () => {
      chart.remove();
    };
  }, []);

  return (
    <>
      <div id={id} />
    </>
  );
};
