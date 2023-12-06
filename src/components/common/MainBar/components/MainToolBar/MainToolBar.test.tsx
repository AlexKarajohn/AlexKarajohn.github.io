import { act, render, screen } from "@testing-library/react";
import { MainToolBar } from "./MainToolBar";
import { menuIconButtonTestId } from "./constants";
import userEvent from "@testing-library/user-event";
import { mockComponent } from "src/util/testing/mockComponent";
import { personalInformation } from "src/assets/content/personalInformation";
const mockSetDrawerValue = jest.fn();
jest.mock("../../context/utils/useMainDrawerContext", () => ({
  useMainBarContext: () => ({
    setDrawerValue: mockSetDrawerValue,
  }),
}));
jest.mock("./components/ColorModeSwitch/ColorModeSwitch", () => ({
  ColorModeSwitch: () => {
    return mockComponent({ name: "ColorModeSwitch" });
  },
}));

describe("MainToolBar", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should render name", () => {
    render(<MainToolBar />);
    expect(screen.getByText(personalInformation.name)).toBeInTheDocument();
  });
  it("should render title", () => {
    render(<MainToolBar />);
    expect(screen.getByText(personalInformation.title)).toBeInTheDocument();
  });
  describe("Menu", () => {
    it("should render a menu button", async () => {
      render(<MainToolBar />);
      expect(screen.getByTestId(menuIconButtonTestId)).toBeInTheDocument();
    });
    it("should call setDrawerValue with true when clicked", async () => {
      render(<MainToolBar />);
      await act(async () => {
        await userEvent.click(screen.getByTestId(menuIconButtonTestId));
      });
      expect(mockSetDrawerValue).toHaveBeenCalledTimes(1);
      expect(mockSetDrawerValue).toHaveBeenCalledWith(true);
    });
  });
});
