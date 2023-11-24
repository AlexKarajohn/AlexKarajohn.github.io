import { render, screen } from "@testing-library/react";
import { mockComponent } from "src/util/testing/mockComponent";
import { DrawerMenu } from "./DrawerMenu";
import { ListMenuItemProps } from "./components/ListMenuItem/ListMenuItem";

const mockTitle = "mock-title";
const mockList = jest.fn();
jest.mock(
  "src/components/common/MainBar/context/utils/useMainDrawerContext",
  () => ({
    useMainBarContext: () => ({
      title: mockTitle,
      list: mockList(),
    }),
  }),
);

const mockListMenuItem = jest.fn();
jest.mock("./components/ListMenuItem/ListMenuItem", () => ({
  ListMenuItem: (props: ListMenuItemProps) => {
    mockListMenuItem({ ...props });
    return mockComponent({ name: "ListMenuItem", props });
  },
}));

describe("DrawerMenu", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it("should render the title", () => {
    mockList.mockReturnValueOnce([]);
    render(<DrawerMenu />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });
  it.each([
    [[]],
    [[{ id: 1 }, { id: 2 }]],
    [[{ id: 1 }, { id: 2 }, { id: 3 }]],
  ])(
    "should render as many items as provided by the useMainBarContext with expected prop %p",
    (items: { id: number }[]) => {
      mockList.mockReturnValueOnce(items);
      render(<DrawerMenu />);
      expect(mockListMenuItem).toHaveBeenCalledTimes(items.length);
      items.forEach((item) => {
        expect(mockListMenuItem).toHaveBeenCalledWith({ item });
      });
    },
  );
});
