export const makeFixture = <T>(defaults: T, overrides: Partial<T>): T => {
  return { ...defaults, ...overrides };
};
