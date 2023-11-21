import { mockComponent } from "src/util/testing/mockComponent";
import { MainBar } from "./MainBar";
import { render, screen } from "@testing-library/react";
import { MainBarContextProps } from "./context/MainBarProvider";
import { menuConfiguration } from "./asset/list";

const mockMainBarProvider = jest.fn();
jest.mock("./context/MainBarProvider", () => ({
  ...jest.requireActual("./context/MainBarProvider"),
  MainBarProvider: (props: MainBarContextProps) => {
    mockMainBarProvider(props);
    return mockComponent({ name: "MainBarProvider", props });
  },
}));
jest.mock("./components/MainDrawer/MainDrawer", () => ({
  MainDrawer: () => {
    return mockComponent({ name: "MainDrawer" });
  },
}));
jest.mock("./components/MainToolBar/MainToolBar", () => ({
  MainToolBar: () => {
    return mockComponent({ name: "MainToolBar" });
  },
}));
const mockAppBar = jest.fn();
jest.mock("@mui/material/AppBar", () => ({
  __esModule: true,
  default: (props: unknown) => {
    mockAppBar(props);
    return mockComponent({ name: "AppBar", props });
  },
}));

describe("MainBar", () => {
  describe("Provider", () => {
    it("should wrap the all jsx objects with MainBarProvider", () => {
      const { container } = render(<MainBar />);
      //Provider was called
      expect(mockMainBarProvider).toHaveBeenCalled();
      //Provider was called with the correct prop
      expect(mockMainBarProvider.mock.lastCall[0].menuConfiguration).toBe(
        menuConfiguration,
      );
      //Container has only one first child
      expect(container.childNodes.length).toBe(1);
      //Provider was the first child of the container
      expect(
        container.firstChild?.isEqualNode(
          screen.getByTestId("MainBarProvider"),
        ),
      ).toBe(true);
    });
  });
  describe("MainDrawer", () => {
    it("should be rendered", () => {
      render(<MainBar />);
      expect(screen.getByTestId("MainDrawer")).toBeInTheDocument();
    });
  });
  describe("AppBar", () => {
    it("should be rendered", () => {
      render(<MainBar />);
      expect(screen.getByTestId("AppBar")).toBeInTheDocument();
    });
    it("should contain MainToolBar", () => {
      render(<MainBar />);
      const mainToolBar = screen.getByTestId("MainToolBar");
      expect(screen.getByTestId("AppBar").contains(mainToolBar));
    });
  });
});
