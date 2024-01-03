import { useEffect, useRef, useState } from "react";
import dataD from "./data/coins.json";
import { CoinInput, RawData, cryptoCoinChart } from "./utils/cryptoCoinChart";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import { v4 as uuid } from "uuid";

const id = "cryptoCoin";

export const CryptoCoin = () => {
  const [view, setView] = useState<keyof CoinInput>("market_cap");
  const [coin, setCoin] = useState<keyof RawData>("bitcoin");
  const [value, setValue] = useState<number[]>([0, 100]);
  const chartRef = useRef<cryptoCoinChart>();
  const debounceRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    chartRef.current = new cryptoCoinChart({
      data: dataD.bitcoin.map((item: CoinInput) => {
        const date = item.date.split("/");
        return {
          ...item,
          usd: Number(item.market_cap),
          date: new Date(
            parseInt(date[2], 10),
            parseInt(date[1], 10) - 1,
            parseInt(date[0], 10),
          ),
          id: uuid(),
        };
      }),
      id,
      entireHeight: 600,
      entireWidth: 800,
    });

    return () => {
      chartRef?.current?.remove();
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const onCoinHandleChange = (event: SelectChangeEvent) => {
    setCoin(event?.target?.value as keyof RawData);
    const data = dataD[coin].map((item: CoinInput) => {
      const date = item.date.split("/");
      return {
        ...item,
        usd: Number(item[view]),
        date: new Date(
          parseInt(date[2], 10),
          parseInt(date[1], 10) - 1,
          parseInt(date[0], 10),
        ),
        id: uuid(),
      };
    });
    if (chartRef.current) chartRef.current.setData(data);
  };

  const onViewChangeHandler = (e: unknown) => {
    setView((e as SelectChangeEvent).target.value as keyof CoinInput);
    const data = dataD[coin].map((item: CoinInput) => {
      const date = item.date.split("/");
      return {
        ...item,
        usd: Number(item[view]),
        date: new Date(
          parseInt(date[2], 10),
          parseInt(date[1], 10) - 1,
          parseInt(date[0], 10),
        ),
        id: uuid(),
      };
    });
    if (chartRef.current) chartRef.current.setData(data);
  };

  const step = 100 / dataD[coin].length;

  const indexGetter = (value: number) => {
    return Math.ceil(value > 0 ? value * (dataD[coin].length / 100) - 1 : 0);
  };

  function valuetext(value: number) {
    const index = indexGetter(value);
    return JSON.stringify(dataD[coin][index]?.date);
  }

  const updateTimeWindow = () => {
    const unformattedLargestDate =
      dataD[coin][indexGetter(value[1])]?.date.split("/");
    const largestDate = new Date(
      parseInt(unformattedLargestDate[2], 10),
      parseInt(unformattedLargestDate[1], 10) - 1,
      parseInt(unformattedLargestDate[0], 10),
    );

    const unformattedSmallestDate =
      dataD[coin][indexGetter(value[0])]?.date.split("/");
    const smallestDate = new Date(
      parseInt(unformattedSmallestDate[2], 10),
      parseInt(unformattedSmallestDate[1], 10) - 1,
      parseInt(unformattedSmallestDate[0], 10),
    );

    const data = dataD[coin]
      .map((item: CoinInput) => {
        const date = item.date.split("/");
        return {
          ...item,
          usd: Number(item[view]),
          date: new Date(
            parseInt(date[2], 10),
            parseInt(date[1], 10) - 1,
            parseInt(date[0], 10),
          ),
          id: uuid(),
        };
      })
      .filter((item) => {
        return item.date < largestDate && item.date > smallestDate;
      });

    if (chartRef.current) chartRef.current.setData(data);
  };

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateTimeWindow();
    }, 250);
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", width: "800px" }}>
        <div id={id} />
        <Box sx={{ padding: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <ToggleButtonGroup
              color="primary"
              value={view}
              orientation="horizontal"
              exclusive
              onChange={onViewChangeHandler}
            >
              <ToggleButton value="market_cap">market_cap</ToggleButton>
              <ToggleButton value="price_usd">price_usd</ToggleButton>
              <ToggleButton value="24h_vol">24h_vol</ToggleButton>
            </ToggleButtonGroup>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="coin-label">Coin</InputLabel>
              <Select
                labelId="dcoin-label"
                value={coin}
                label="Coin"
                onChange={onCoinHandleChange}
                fullWidth
              >
                {Object.keys(dataD).map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Slider
            getAriaLabel={() => "Date Range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            step={step}
            valueLabelFormat={valuetext}
            marks={[
              { value: 0, label: dataD[coin][0].date },
              { value: 100, label: dataD[coin][dataD[coin].length - 1].date },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};
