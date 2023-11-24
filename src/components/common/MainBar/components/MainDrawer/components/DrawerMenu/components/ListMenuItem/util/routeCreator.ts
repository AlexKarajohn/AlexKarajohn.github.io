export const routeCreator = (
  parentPath: string | undefined,
  selfPath: string | undefined,
): string | undefined => {
  if (selfPath === undefined) return undefined;
  if (parentPath) return parentPath + "/" + selfPath;
  return selfPath;
};
