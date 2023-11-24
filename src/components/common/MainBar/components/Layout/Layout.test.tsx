import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";
import { mockComponent } from "src/util/testing/mockComponent";

jest.mock("../../MainBar", () => ({
  MainBar: () => {
    return mockComponent({ name: "MainBar" });
  },
}));
jest.mock("react-router-dom", () => ({
  Outlet: () => {
    return mockComponent({ name: "Outlet" });
  },
}));

describe("Layout", () => {
  it("should render mainBar", () => {
    render(<Layout />);
    expect(screen.getByTestId("MainBar")).toBeInTheDocument();
  });
  it("should render its provided children when provided children", () => {
    const testText = "test";
    const child = <div>{testText}</div>;

    render(<Layout>{child}</Layout>);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });
  it("should render outlet when not provided children", () => {
    render(<Layout />);
    expect(screen.getByTestId("Outlet")).toBeInTheDocument();
  });
});
