import { createAvatarUrl } from '.';
import { AVATAR_SIZES } from '@src/common/constants';
import { AvatarSizes } from 'types/index';

describe('createAvatarUrl', () => {
  it('should return a valid avatar url with a medium avatar size if no size is passed in', () => {
    const avatarUrl = createAvatarUrl({
      avatarFilename: 'avatar.png',
      imageStackDomain: 'imagestack.com',
      imageStackId: 'imagestackid',
    });
    const avatarSize = AVATAR_SIZES.md;
    expect(isNaN(avatarSize)).toBe(false);
    expect(avatarUrl).toEqual(
      `https://imagestackid.imagestack.com/fit-in/${avatarSize}x${avatarSize}/filters:upscale()/avatar.png`
    );
  });

  it('should map to the AVATAR_SIZES', () => {
    const avatarUrl = createAvatarUrl({
      avatarFilename: 'avatar.png',
      size: '2xl',
      imageStackDomain: 'imagestack.com',
      imageStackId: 'imagestackid',
    });
    const avatarSize = AVATAR_SIZES['2xl'];
    expect(isNaN(avatarSize)).toBe(false);
    expect(avatarUrl).toEqual(
      `https://imagestackid.imagestack.com/fit-in/${avatarSize}x${avatarSize}/filters:upscale()/avatar.png`
    );
  });

  it('should have the sizes in each url for every size of AVATAR_IMAGES', () => {
    Object.entries(AVATAR_SIZES).forEach(
      ([size, sizeInPx]: [string, typeof AVATAR_SIZES[keyof typeof AVATAR_SIZES]]) => {
        const avatarUrl = createAvatarUrl({
          avatarFilename: 'avatar.png',
          size: size as AvatarSizes,
          imageStackDomain: 'imagestack.com',
          imageStackId: 'imagestackid',
        });
        expect(isNaN(sizeInPx)).toBe(false);
        expect(avatarUrl).toEqual(
          `https://imagestackid.imagestack.com/fit-in/${sizeInPx}x${sizeInPx}/filters:upscale()/avatar.png`
        );
      }
    );
  });
});
