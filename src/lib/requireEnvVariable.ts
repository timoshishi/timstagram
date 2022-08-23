export const requireEnvVariable = (name: string): string => {
  const value = process.env[name];
  if (typeof value !== 'string') {
    throw new Error(`Missing environment variable ${name}, ${process.env[name]}`);
  }
  return value;
};
