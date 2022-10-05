export { isMobileBrowser } from './isMobile';
import { AVATAR_SIZES } from '@common/constants';
import { Environment } from 'types/environment';
import { AvatarSizes } from 'types/index';

export function randomIntInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const noOp: () => void = () => {};

export const createAvatarUrl = ({
  avatarFilename,
  size = 'md',
  imageStackDomain,
  imageStackId,
}: {
  avatarFilename: string;
  size?: AvatarSizes;
  imageStackDomain: Environment['NEXT_PUBLIC_IMAGE_STACK_DOMAIN'];
  imageStackId: Environment['NEXT_PUBLIC_IMAGE_STACK_ID'];
}) => {
  const sizeInPx = AVATAR_SIZES[size];
  return `https://${imageStackId}.${imageStackDomain}/fit-in/${sizeInPx}x${sizeInPx}/filters:upscale()/${avatarFilename}`;
};
