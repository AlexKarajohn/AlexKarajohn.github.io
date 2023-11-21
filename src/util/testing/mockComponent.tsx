interface mockComponentParams {
  name: string;
  props?: unknown;
}

export const mockComponent = ({ name, props }: mockComponentParams) => {
  const MockedComponentName = "mock-" + name;

  return (
    <MockedComponentName
      {...(props as Record<string, unknown>)}
      data-testId={name}
    />
  );
};
