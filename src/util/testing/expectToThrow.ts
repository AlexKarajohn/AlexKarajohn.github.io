export const expectToThrow = (
  func: () => unknown,
  error?: JestToErrorArg,
): void => {
  const spy = jest.spyOn(console, "error");
  spy.mockImplementation();

  expect(func).toThrow(error);

  spy.mockRestore();
};

type JestToErrorArg = Parameters<
  jest.Matchers<unknown, () => unknown>["toThrow"]
>[0];
