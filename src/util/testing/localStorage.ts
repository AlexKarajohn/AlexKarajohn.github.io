export const mockLocalStorage = () => {
  const localStorageMock = (function () {
    let store: Record<string, unknown> = {};

    return {
      getItem(key: string): unknown {
        return store[key];
      },

      setItem(key: string, value: unknown) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();

  Object.defineProperty(window, "localStorage", { value: localStorageMock });
};
