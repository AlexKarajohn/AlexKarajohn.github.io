import { expectToThrow } from "src/util/testing/expectToThrow";
import * as allExportsUseMainDrawerContext from "./useThemeContext";
import { render } from "@testing-library/react";
import { ThemeProvider } from "../ThemeProvider";
import { Context } from "react";

const mockContextTracker = jest.fn();

const HelperComponent = () => {
  const context = allExportsUseMainDrawerContext.useThemeContext();
  mockContextTracker(context);
  return <div />;
};
const mockedUseContext = jest.fn();

jest.mock("react", () => {
  const originalReact = jest.requireActual("react");
  return {
    ...originalReact,
    useContext: (x: Context<unknown>) => mockedUseContext(x),
  };
});

describe("useMainDrawerContext hook", () => {
  beforeEach(() => {
    const originalReact = jest.requireActual("react");
    mockedUseContext.mockImplementation((x) => originalReact.useContext(x));
    mockContextTracker.mockReset();
  });
  describe("inside a provider", () => {
    it("should not throw error when within a provider", () => {
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      expect(mockContextTracker).toHaveBeenCalled();
    });
    it("should return the expected context within a provider", () => {
      const expectedValue = "expectedContext";
      mockedUseContext.mockImplementation(() => expectedValue);
      render(
        <ThemeProvider>
          <HelperComponent />
        </ThemeProvider>,
      );
      expect(mockContextTracker).toHaveBeenCalledWith(expectedValue);
    });
  });
  describe("outside a provider", () => {
    it("should throw an error when outside a provider", () => {
      const renderWithoutProvider = () => render(<HelperComponent />);
      expect(mockContextTracker).not.toHaveBeenCalled();
      expectToThrow(
        renderWithoutProvider,
        allExportsUseMainDrawerContext.useThemeContextError,
      );
    });
  });
});
