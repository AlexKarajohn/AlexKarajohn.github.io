import { expectToThrow } from "src/util/testing/expectToThrow";
import * as allExportsUseMainDrawerContext from "./useMainDrawerContext";
import { render } from "@testing-library/react";
import { MainBarProvider } from "../MainBarProvider";
import { Context } from "react";
import { mockMenuConfiguration } from "../__test__/menuConfiguration";
const mockContextTracker = jest.fn();

const HelperComponent = () => {
  const context = allExportsUseMainDrawerContext.useMainBarContext();
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
        <MainBarProvider menuConfiguration={mockMenuConfiguration}>
          <HelperComponent />
        </MainBarProvider>,
      );
      expect(mockContextTracker).toHaveBeenCalled();
    });
    it("should return the expected context within a provider", () => {
      const expectedValue = "expectedContext";
      mockedUseContext.mockImplementation(() => expectedValue);
      render(
        <MainBarProvider menuConfiguration={mockMenuConfiguration}>
          <HelperComponent />
        </MainBarProvider>,
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
        allExportsUseMainDrawerContext.useMainBarContextErrorMessage,
      );
    });
  });
});
