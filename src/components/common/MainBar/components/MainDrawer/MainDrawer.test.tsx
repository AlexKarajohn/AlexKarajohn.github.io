import { mockComponent } from "src/util/testing/mockComponent";
import { SwipeableDrawerProps } from "@mui/material/SwipeableDrawer";
import { render, screen } from "@testing-library/react";
import { MainDrawer } from "./MainDrawer";

const mockIsDrawerOpenValue = true;
const mockSetDrawerValue = jest.fn();
jest.mock("../../context/utils/useMainDrawerContext", () => ({
  useMainBarContext: () => ({
    setDrawerValue: mockSetDrawerValue,
    isDrawerOpen: mockIsDrawerOpenValue,
  }),
}));

const mockSwipeableDrawer = jest.fn();
jest.mock("@mui/material/SwipeableDrawer", () => ({
  __esModule: true,
  ...jest.requireActual("@mui/material/SwipeableDrawer"),
  default: (props: SwipeableDrawerProps) => {
    mockSwipeableDrawer(props);
    return mockComponent({ name: "SwipeableDrawer", props });
  },
}));

const mockDrawerMenu = jest.fn();
jest.mock("./components/DrawerMenu/DrawerMenu", () => ({
  DrawerMenu: () => {
    mockDrawerMenu();
    return mockComponent({ name: "DrawerMenu" });
  },
}));

describe("MainDrawer", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("SwipeableDrawer", () => {
    it("should render a swipeableDrawer", () => {
      render(<MainDrawer />);
      expect(screen.getByTestId("SwipeableDrawer")).toBeInTheDocument();
    });
    it("should get isDrawerOpen value as open prop", () => {
      render(<MainDrawer />);
      expect(mockSwipeableDrawer).toHaveBeenCalledWith(
        expect.objectContaining({ open: mockIsDrawerOpenValue }),
      );
    });
    it("should get onClose prop that calls setDrawerValue with false", () => {
      render(<MainDrawer />);
      mockSwipeableDrawer.mock.lastCall[0].onClose();
      expect(mockSetDrawerValue).toHaveBeenCalledWith(false);
    });
    it("should get onOpen prop that calls setDrawerValue with true", () => {
      render(<MainDrawer />);
      mockSwipeableDrawer.mock.lastCall[0].onOpen();
      expect(mockSetDrawerValue).toHaveBeenCalledWith(true);
    });
    it("should render DrawerMenu as child", () => {
      render(<MainDrawer />);
      expect(
        screen
          .getByTestId("SwipeableDrawer")
          .firstChild?.isEqualNode(screen.getByTestId("DrawerMenu")),
      ).toBe(true);
    });
  });
});
