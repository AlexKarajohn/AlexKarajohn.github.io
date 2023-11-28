import { act, render, screen } from "@testing-library/react";
import { ColorModeSwitch } from "./ColorModeSwitch";
import { ThemeProvider } from "src/theme/context/ThemeProvider";
import { useContext } from "react";
import { COLOR_MODE, themeContext } from "src/theme/context/themeContext";
import userEvent from "@testing-library/user-event";

const mockContextTracker = jest.fn();

const HelperComponent = () => {
  const context = useContext(themeContext);
  mockContextTracker(context);
  return <div />;
};

describe("ColorModeSwitch", () => {
  it("should render a switch", () => {
    render(
      <ThemeProvider>
        <ColorModeSwitch />
      </ThemeProvider>,
    );
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });
  it("should render the expected text", () => {
    render(
      <ThemeProvider>
        <ColorModeSwitch />
      </ThemeProvider>,
    );
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });
  it("should render the expected text", () => {
    render(
      <ThemeProvider>
        <ColorModeSwitch />
      </ThemeProvider>,
    );
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });
  it("switch value should be mode form themeContext", () => {
    render(
      <ThemeProvider>
        <HelperComponent />
        <ColorModeSwitch />
      </ThemeProvider>,
    );
    if (mockContextTracker.mock.lastCall[0].mode === COLOR_MODE.LIGHT)
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    else expect(screen.getByRole("checkbox")).toBeChecked();
  });
  it("clicking the switch should toggle the mode value in themeContext", async () => {
    render(
      <ThemeProvider>
        <HelperComponent />
        <ColorModeSwitch />
      </ThemeProvider>,
    );
    let prevValue;
    if (mockContextTracker.mock.lastCall[0].mode === COLOR_MODE.LIGHT) {
      prevValue = COLOR_MODE.LIGHT;
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    } else {
      prevValue = COLOR_MODE.DARK;
      expect(screen.getByRole("checkbox")).toBeChecked();
    }
    await act(async () => {
      await userEvent.click(screen.getByRole("checkbox"));
    });
    if (prevValue === COLOR_MODE.LIGHT) {
      expect(screen.getByRole("checkbox")).toBeChecked();
    } else {
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    }
  });
  it("clicking the switch should change the toggle value in themeContext as many times as clicked", async () => {
    render(
      <ThemeProvider>
        <HelperComponent />
        <ColorModeSwitch />
      </ThemeProvider>,
    );
    let prevValue;
    if (mockContextTracker.mock.lastCall[0].mode === COLOR_MODE.LIGHT) {
      prevValue = COLOR_MODE.LIGHT;
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    } else {
      prevValue = COLOR_MODE.DARK;
      expect(screen.getByRole("checkbox")).toBeChecked();
    }
    await act(async () => {
      await userEvent.click(screen.getByRole("checkbox"));
    });
    if (prevValue === COLOR_MODE.LIGHT) {
      prevValue = COLOR_MODE.DARK;
      expect(screen.getByRole("checkbox")).toBeChecked();
    } else {
      prevValue = COLOR_MODE.LIGHT;
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    }
    await act(async () => {
      await userEvent.click(screen.getByRole("checkbox"));
    });
    if (prevValue === COLOR_MODE.LIGHT) {
      expect(screen.getByRole("checkbox")).toBeChecked();
    } else {
      expect(screen.getByRole("checkbox")).not.toBeChecked();
    }
  });
});
