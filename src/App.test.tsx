import { App } from "src/App";
import { render, screen } from "@testing-library/react";

describe("simple test", () => {
  it("should pass", () => {
    render(<App />);
    expect(screen.getByTestId("App")).toBeInTheDocument();
  });
});
