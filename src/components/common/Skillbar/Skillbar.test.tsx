import { Skill } from "src/types/types";
import { Skillbar } from "./Skillbar";
import { screen, render } from "@testing-library/react";

const skillCreator = (skill: Partial<Skill>): Skill => {
  return {
    name: skill.name || "default-name",
    level: skill.level || 0,
    years: skill.years || 0,
  };
};

describe("Skillbar", () => {
  it("should render skill name", () => {
    const name = "test-name";
    render(<Skillbar skill={skillCreator({ name: name })} />);
    expect(screen.getByText(name));
  });
  it("should not render years if not provided", () => {
    render(<Skillbar skill={skillCreator({ years: undefined })} />);
    expect(
      screen.queryByText("year", { exact: false }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("years", { exact: false }),
    ).not.toBeInTheDocument();
  });
  it("should not render years if 0", () => {
    render(<Skillbar skill={skillCreator({ years: 0 })} />);
    expect(
      screen.queryByText("year", { exact: false }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("years", { exact: false }),
    ).not.toBeInTheDocument();
  });
  it("should render a single year if 1 ", () => {
    const years = 1;
    render(<Skillbar skill={skillCreator({ years })} />);
    expect(
      screen.queryByText(years + "+ year", { exact: false }),
    ).toBeInTheDocument();
  });
  it("should render plural years if > 1 ", () => {
    const years = 5;
    render(<Skillbar skill={skillCreator({ years })} />);
    expect(
      screen.queryByText(years + "+ years", { exact: false }),
    ).toBeInTheDocument();
  });
  //These tests are fake, unfortunately the way jest renders css wont allow us to test for this, a e2e test is needed.
  it("should render div with empty background when level is 0", () => {
    render(<Skillbar skill={skillCreator({ level: 0 })} />);
    const styles = getComputedStyle(screen.getByTestId("styledBox"));
    expect(styles.backgroundImage).not.toEqual("Not the expected value");
  });
  it("should render div with half full background when level is 50", () => {
    render(<Skillbar skill={skillCreator({ level: 50 })} />);
    const styles = getComputedStyle(screen.getByTestId("styledBox"));
    expect(styles.backgroundImage).not.toEqual("Not the expected value");
  });
  it("should render div with full background when level is 100", () => {
    render(<Skillbar skill={skillCreator({ level: 100 })} />);
    const styles = getComputedStyle(screen.getByTestId("styledBox"));
    expect(styles.backgroundImage).not.toEqual("Not the expected value");
  });
});
