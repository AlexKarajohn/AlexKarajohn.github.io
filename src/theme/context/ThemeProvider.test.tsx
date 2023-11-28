import { useContext } from "react";
import { COLOR_MODE, themeContext } from "./themeContext";
import { act, render } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { mockLocalStorage } from "src/util/testing/localStorage";

const mockContextTracker = jest.fn();

const HelperComponent = () => {
  const context = useContext(themeContext);
  mockContextTracker(context);
  return <div />;
};

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockLocalStorage();
  });
  describe("Children should have access to", () => {
    it("mode", () => {
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      expect(mockContextTracker).lastCalledWith(
        expect.objectContaining({ mode: expect.any(String) }),
      );
    });
    it("mode should be default value of light", () => {
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      expect(mockContextTracker).lastCalledWith(
        expect.objectContaining({ mode: COLOR_MODE.LIGHT }),
      );
    });
    it("mode should be localStorage value if available", () => {
      localStorage.setItem("colorMode", COLOR_MODE.DARK);
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      expect(mockContextTracker).lastCalledWith(
        expect.objectContaining({ mode: COLOR_MODE.DARK }),
      );
    });
    it("setMode should change mode", () => {
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      act(() => {
        mockContextTracker.mock.lastCall[0].setMode(COLOR_MODE.DARK);
      });
      expect(mockContextTracker).lastCalledWith(
        expect.objectContaining({ mode: COLOR_MODE.DARK }),
      );
    });
    it("setMode should perssist data in localStorage", () => {
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      act(() => {
        mockContextTracker.mock.lastCall[0].setMode(COLOR_MODE.DARK);
      });
      expect(mockContextTracker).lastCalledWith(
        expect.objectContaining({ mode: COLOR_MODE.DARK }),
      );
      expect(localStorage.getItem("colorMode")).toBe(COLOR_MODE.DARK);
    });
  });
});
