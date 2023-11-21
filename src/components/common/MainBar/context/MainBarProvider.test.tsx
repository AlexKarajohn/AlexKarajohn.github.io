import { useContext } from "react";
import { mainBarContext } from "./mainBarContext";
import { act, render } from "@testing-library/react";
import { MainBarProvider } from "./MainBarProvider";
import { mockMenuConfiguration } from "./__test__/menuConfiguration";
import { DrawerMenuItem } from "src/types/types";

const mockContextTracker = jest.fn();

const HelperComponent = () => {
  const context = useContext(mainBarContext);
  mockContextTracker(context);
  return <div />;
};

describe("MainBarProvider", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("Children should have access to", () => {
    describe("drawerState", () => {
      it("isDrawerOpen getter boolean state", () => {
        render(
          <MainBarProvider menuConfiguration={{ ...mockMenuConfiguration }}>
            <HelperComponent />
          </MainBarProvider>,
        );
        expect(mockContextTracker).lastCalledWith(
          expect.objectContaining({ isDrawerOpen: false }),
        );
      });
      it("isDrawerOpen setter boolean state", () => {
        render(
          <MainBarProvider menuConfiguration={{ ...mockMenuConfiguration }}>
            <HelperComponent />
          </MainBarProvider>,
        );
        let nextValue = true;
        act(() => {
          mockContextTracker.mock.lastCall[0].setDrawerValue(nextValue);
        });
        expect(mockContextTracker).lastCalledWith(
          expect.objectContaining({ isDrawerOpen: nextValue }),
        );
        nextValue = false;
        act(() => {
          mockContextTracker.mock.lastCall[0].setDrawerValue(nextValue);
        });
        expect(mockContextTracker).lastCalledWith(
          expect.objectContaining({ isDrawerOpen: nextValue }),
        );
      });
    });
    describe("menu configuration getters", () => {
      it("list should return props.menuConfiguration.list", () => {
        const list: DrawerMenuItem[] = [{ id: "testId", text: "test-text" }];
        render(
          <MainBarProvider
            menuConfiguration={{ ...mockMenuConfiguration, list }}
          >
            <HelperComponent />
          </MainBarProvider>,
        );
        expect(mockContextTracker).lastCalledWith(
          expect.objectContaining({ list: list }),
        );
      });
      it("title should return props.menuConfiguration.title", () => {
        const title = "test-title";
        render(
          <MainBarProvider
            menuConfiguration={{ ...mockMenuConfiguration, title }}
          >
            <HelperComponent />
          </MainBarProvider>,
        );
        expect(mockContextTracker).lastCalledWith(
          expect.objectContaining({ title: title }),
        );
      });
    });
  });
});
