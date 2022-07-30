export { isMobileBrowser } from './isMobile';

export function randomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const noOp: () => void = () => {};
