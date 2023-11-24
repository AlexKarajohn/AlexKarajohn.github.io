import { act, render, screen } from "@testing-library/react";
import { listItemCreator } from "src/util/testing/listItemCreator";
import * as ListMenuItemDefault from "./ListMenuItem";
import { MemoryRouter } from "react-router-dom";
import { ListItem } from "src/types/types";
import userEvent from "@testing-library/user-event";

const mockSetDrawerValue = jest.fn();
jest.mock(
  "src/components/common/MainBar/context/utils/useMainDrawerContext",
  () => ({
    useMainBarContext: () => ({
      setDrawerValue: mockSetDrawerValue,
    }),
  }),
);

const mockUseMatch = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useMatch: () => mockUseMatch(),
}));

describe("ListMenuItem", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("User actions", () => {
    it("Clicking list item should set drawer value to false", async () => {
      const item = listItemCreator({
        text: "parent",
      });
      renderWithRouter(item, true);

      await act(async () => {
        await userEvent.click(screen.getByRole("button"));
      });

      expect(mockSetDrawerValue).toHaveBeenCalledWith(false);
    });
  });
  describe("Optional renders", () => {
    it("text should be bold if path is active", () => {
      mockUseMatch.mockReturnValueOnce(true);
      const item = listItemCreator({
        text: "parent",
      });
      renderWithRouter(item, true);
      expect(screen.getByText("parent")).toBeInTheDocument();
      expect(screen.getByTestId("bold-text")).toBeInTheDocument();
    });
    it("text should not be bold if path is not active", () => {
      mockUseMatch.mockReturnValueOnce(false);
      const item = listItemCreator({
        text: "parent",
      });
      renderWithRouter(item, true);
      expect(screen.queryByTestId("bold-text")).not.toBeInTheDocument();
    });
    it("paddingLeft should be smaller when isChild is true ", () => {
      const item = listItemCreator({
        text: "parent",
      });
      renderWithRouter(item, true);
      expect(getComputedStyle(screen.getByRole("button")).paddingLeft).toBe(
        1 * 8 + "px",
      );
    });
    it("paddingLeft should be larger when isChild is false ", () => {
      const item = listItemCreator({
        text: "parent",
      });
      renderWithRouter(item, false);
      expect(getComputedStyle(screen.getByRole("button")).paddingLeft).toBe(
        2 * 8 + "px",
      );
    });
    it("should render icon when available", () => {
      const item = listItemCreator({
        text: "parent",
        icon: <div data-testid="test-icon" />,
      });
      renderWithRouter(item);
      expect(screen.getByTestId("test-icon")).toBeInTheDocument();
    });
    it("should render button with text when path is not available", () => {
      const item = listItemCreator({ text: "parent" });
      renderWithRouter(item);
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByRole("button").textContent).toBe("parent");
    });
    it("should render link with href pointing to the proper path when available", () => {
      const item = listItemCreator({ text: "parent", path: "testPath" });
      renderWithRouter(item);
      expect(screen.getByRole("link")).toBeInTheDocument();
      expect(screen.getByRole("link").getAttribute("href")).toBe("/testPath");
    });
  });
  describe("Has children", () => {
    it("should display extra expand button", () => {
      const item = listItemCreator({
        text: "parent",
        children: [listItemCreator({ text: "parent" })],
      });
      renderWithRouter(item);
      expect(screen.getByTestId("expand")).toBeInTheDocument();
    });
    it("should display extra expand button with expand icon", () => {
      const item = listItemCreator({
        text: "parent",
        children: [listItemCreator({ text: "parent" })],
      });
      renderWithRouter(item);
      expect(screen.getByTestId("expand").firstChild).toBe(
        screen.getByTestId("ExpandMoreIcon"),
      );
    });
    it("should display extra expand button with retract icon when already expanded", async () => {
      const item = listItemCreator({
        text: "parent",
        children: [listItemCreator({ text: "parent" })],
      });
      renderWithRouter(item);
      await act(async () => {
        await userEvent.click(screen.getByTestId("ExpandMoreIcon"));
      });
      expect(screen.getByTestId("expand").firstChild).toBe(
        screen.getByTestId("ExpandLessIcon"),
      );
    });
    it("should not render children unless expanded", () => {
      const item = listItemCreator({
        text: "parent",
        children: [listItemCreator({ text: "parent" })],
      });
      renderWithRouter(item);
      expect(screen.getAllByRole("listitem").length).toBe(1);
    });
    it("should render children when expanded", async () => {
      const spyedOnComponent = jest.spyOn(ListMenuItemDefault, "ListMenuItem");
      const childCreatorArray = [1, 2, 3].map((item) => "child-" + item);
      const item = listItemCreator({
        text: "parent",
        path: "parentUrl",
        children: childCreatorArray.map((item) =>
          listItemCreator({ text: item }),
        ),
      });
      renderWithRouter(item);
      await act(async () => {
        await userEvent.click(screen.getByTestId("ExpandMoreIcon"));
      });
      expect(screen.getAllByRole("listitem").length).toBe(4);

      childCreatorArray.forEach((child) => {
        expect(spyedOnComponent).toHaveBeenCalledWith(
          expect.objectContaining({
            isChild: true,
            item: {
              id: expect.any(String),
              text: child,
            },
            parentUrl: "parentUrl",
          }),
          {},
        );
      });
    });
  });
});

const renderWithRouter = (item: ListItem, isChild?: boolean) => {
  render(
    <MemoryRouter>
      <ListMenuItemDefault.ListMenuItem item={item} isChild={isChild} />
    </MemoryRouter>,
  );
};
