import { ThemeOptions } from "@mui/material";
import { COLOR_MODE } from "./context/themeContext";
import { themeCreator } from "./themeCreator";

const mockCreateTheme = jest.fn();
jest.mock("@mui/material/styles", () => ({
  createTheme: (options?: ThemeOptions, ...args: object[]) =>
    mockCreateTheme(options, ...args),
}));

describe("themeCreator", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("color modes", () => {
    it("should call MUI createTheme with expected palette value for dark mode", () => {
      themeCreator(COLOR_MODE.DARK);
      expect(mockCreateTheme).toHaveBeenCalledWith(
        expect.objectContaining({ palette: { mode: "dark" } }),
      );
    });
    it("should call MUI createTheme with expected palette value for light mode", () => {
      themeCreator(COLOR_MODE.LIGHT);
      expect(mockCreateTheme).toHaveBeenCalledWith(
        expect.objectContaining({ palette: { mode: "light" } }),
      );
    });
  });
});
