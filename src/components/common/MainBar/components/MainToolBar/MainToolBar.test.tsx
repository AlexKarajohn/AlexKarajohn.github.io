import { act, render, screen } from "@testing-library/react";
import { MainToolBar } from "./MainToolBar";
import { menuIconButtonTestId, name, title } from "./constants";
import userEvent from "@testing-library/user-event";
const mockSetDrawerValue = jest.fn();
jest.mock("../../context/utils/useMainDrawerContext", () => ({
  useMainBarContext: () => ({
    setDrawerValue: mockSetDrawerValue,
  }),
}));

describe("MainToolBar", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should render name", () => {
    render(<MainToolBar />);
    expect(screen.getByText(name)).toBeInTheDocument();
  });
  it("should render title", () => {
    render(<MainToolBar />);
    expect(screen.getByText(title)).toBeInTheDocument();
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
