import { routeCreator } from "./routeCreator";

const parentPath = "parentPath";
const selfPath = "selfPath";

describe("routeCreator", () => {
  it("should return undefined when selfPath is undefined", () => {
    const expected = routeCreator(parentPath, undefined);
    expect(expected).toBeUndefined();
  });
  it("should only return selfPath if parentPath is undefined", () => {
    const expected = routeCreator(undefined, selfPath);
    expect(expected).toBe(selfPath);
  });
  it("should return combined parent & self paths with a slash ", () => {
    const expected = routeCreator(parentPath, selfPath);
    expect(expected).toBe(`${parentPath}/${selfPath}`);
  });
});
