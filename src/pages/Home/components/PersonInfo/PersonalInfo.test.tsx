import { personalInformation } from "src/assets/content/personalInformation";
import { PersonInfo } from "./PersonInfo";
import { screen, render } from "@testing-library/react";

describe("PersonalInfo", () => {
  it("should render personal picture", () => {
    render(<PersonInfo />);
    expect(
      screen.getByAltText(personalInformation.name + "-picture"),
    ).toBeInTheDocument();
    expect(
      screen
        .getByAltText(personalInformation.name + "-picture")
        .getAttribute("src"),
    ).not.toBeNull();
  });
  it("should render name", () => {
    render(<PersonInfo />);
    expect(screen.getByText(personalInformation.name)).toBeInTheDocument();
  });
  it("should render title", () => {
    render(<PersonInfo />);
    expect(screen.getByText(personalInformation.title)).toBeInTheDocument();
  });
  it("should render description", () => {
    render(<PersonInfo />);
    expect(
      screen.getByText(personalInformation.description),
    ).toBeInTheDocument();
  });
});
