import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { useThemeContext } from "src/theme/context/utils/useThemeContext";
import { COLOR_MODE } from "src/theme/context/themeContext";
import { ChangeEvent } from "react";

export const ColorModeSwitch = () => {
  const { mode, setMode } = useThemeContext();
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Switch
            checked={mode == COLOR_MODE.DARK ? true : false}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setMode(
                event?.target.checked ? COLOR_MODE.DARK : COLOR_MODE.LIGHT,
              );
            }}
          />
        }
        label="Dark Mode"
      />
    </FormGroup>
  );
};
