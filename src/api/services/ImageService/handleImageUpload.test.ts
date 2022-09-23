import {
  getImageProperties,
  getAltText,
  getImageHash,
  createPlaceholder,
  resizeAvatarImage,
  constructMediaUrl,
  getScreenImageDimensions,
  constructStackUrl,
  constructSrcSet,
} from './handleImageUpload';

import { promises } from 'fs';
import path from 'path';
import { UUIDReg } from '@common/utils/regexp';
import type { ImageProperties } from '../../types';
import { scaleImageWidthAndHeight } from '@common/utils/scaleImageWidthAndHeight';

const imageHostDomain = process.env.IMAGE_HOST_DOMAIN;
const fixturesDir = path.join(__dirname, '../../../../__mocks__/fixtures');
const oneAspect = path.join(fixturesDir, 'aspect-1-1.jpg');
const fourThreeAspect = path.join(fixturesDir, 'aspect-4-3.jpg');

const getImageFileNode = async (filePath: string): Promise<[Buffer, File]> => {
  const fileBuffer = await promises.readFile(filePath);
  return [fileBuffer, new File([fileBuffer], 'file' as string, { type: 'image/png' })];
};

describe('getImageProperties', () => {
  const userId = '1';
  const username = 'test';
  const altText = 'test-alt';
  let image: Express.Multer.File;
  beforeEach(() => {
    image = {
      buffer: Buffer.from('test'),
      mimetype: 'image/jpeg',
      originalname: 'testOriginalName.jpg',
      filename: 'testFilename.jpg',
      fieldname: 'croppedImage',
      encoding: '7bit',
      size: 100,
      destination: 'memory',
      path: 'memory',
    } as Express.Multer.File;
  });

  it('returns the image data properties correctly', async () => {
    const [buffer, file] = await getImageFileNode(oneAspect);
    image.buffer = buffer;
    image.size = file.size;

    const img: ImageProperties = await getImageProperties({
      image,
      imageData: {
        originalImageName: 'testOriginalName.jpg',
        aspectRatio: 1,
        dimensions: {
          width: 400,
          height: 400,
        },
      },
      altText,
      userId,
      username,
    });
    expect(img.alt).toEqual(altText);
    expect(img.aspectRatio).toEqual(1);
    expect(img.filename.split('.')[0]).toMatch(UUIDReg);
    expect(img.filename.split('.')[1]).toEqual('jpeg');
    expect(img.hash.length).toBe(64);
    expect(img.height).toEqual(400);
    expect(img.id).toMatch(UUIDReg);
    expect(typeof img.metadata).toBe('string');

    expect(img.placeholder.startsWith('data:image/')).toBe(true);
    expect(img.source).toEqual([process.env.NEXT_PUBLIC_APP_NAME, userId, 'testOriginalName.jpg'].join('/'));
    expect(img.type).toEqual('image/jpeg');
    const url = img.url;
    expect(url.includes(process.env.PHOTO_BUCKET!) && url.includes('amazon')).toBe(true);
    expect(img.bucket).toBe(process.env.PHOTO_BUCKET);
    expect(img.width).toEqual(400);
    expect(img.size).toBe(image.size);
    expect(img.width).not.toBe(500);
    expect(img.domain).toBe(imageHostDomain);
    expect(img.domain).toBeDefined();
    expect(img.domain).not.toBeUndefined();
  });

  it('returns the correct data if the client sent in incorrect data', async () => {
    const [buffer, file] = await getImageFileNode(oneAspect);
    image.buffer = buffer;
    image.size = file.size;

    const img: ImageProperties = await getImageProperties({
      image,
      imageData: {
        originalImageName: 'testOriginalName.jpg',
        aspectRatio: 3,
        dimensions: {
          width: 900,
          height: 2000,
        },
      },
      altText,
      userId,
      username,
    });
    expect(img.aspectRatio).toEqual(1);
    expect(img.height).toEqual(400);
    expect(img.width).toEqual(400);
  });
});

describe('getAltText', () => {
  it('returns the correct alt text', () => {
    expect(getAltText({ caption: 'test' })).toEqual('test');
    const captionWHashTags = 'test #hashtag #hashtag2 dogs';
    expect(getAltText({ caption: captionWHashTags })).toEqual('#hashtag #hashtag2');
  });
});

describe('getImageHash', () => {
  let image: Express.Multer.File;
  beforeEach(() => {
    image = {
      buffer: Buffer.from('test'),
      mimetype: 'image/jpeg',
      originalname: 'testOriginalName.jpg',
      filename: 'testFilename.jpg',
      fieldname: 'croppedImage',
      encoding: '7bit',
      size: 100,
      destination: 'memory',
      path: 'memory',
    } as Express.Multer.File;
  });

  it('returns the same hash if the same image is passed in twice', async () => {
    const [buffer] = await getImageFileNode(oneAspect);
    image.buffer = buffer;
    const hash1 = await getImageHash(image);
    const [buffer2] = await getImageFileNode(oneAspect);
    image.buffer = buffer2;
    const hash2 = await getImageHash(image);
    expect(hash1).toEqual(hash2);
  });

  it('returns a different hash if the image is different', async () => {
    const [buffer] = await getImageFileNode(oneAspect);
    image.buffer = buffer;
    const hash1 = await getImageHash(image);
    const [buffer2] = await getImageFileNode(fourThreeAspect);
    image.buffer = buffer2;
    const hash2 = await getImageHash(image);
    expect(hash1).not.toEqual(hash2);
  });

  it('throws an error if the image is not an image', async () => {
    const buffer = Buffer.from('test');
    image.buffer = buffer;
    image.mimetype = 'text/plain';
    await expect(getImageHash(image)).rejects.toThrowError();
  });
});

describe('createPlaceholder', () => {
  let image: Express.Multer.File;
  beforeEach(() => {
    image = {
      buffer: Buffer.from('test'),
      mimetype: 'image/jpeg',
      originalname: 'testOriginalName.jpg',
      filename: 'testFilename.jpg',
      fieldname: 'croppedImage',
      encoding: '7bit',
      size: 100,
      destination: 'memory',
      path: 'memory',
    } as Express.Multer.File;
  });

  it('returns a base64 image string', async () => {
    const [buffer] = await getImageFileNode(oneAspect);
    image.buffer = buffer;
    const placeholder = await createPlaceholder(image);
    expect(placeholder.startsWith('data:image/')).toBe(true);
  });
});

describe('resizeAvatarImage', () => {
  let image: Express.Multer.File;
  beforeEach(() => {
    image = {
      buffer: Buffer.from('test'),
      mimetype: 'image/jpeg',
      originalname: 'testOriginalName.jpg',
      filename: 'testFilename.jpg',
      fieldname: 'croppedImage',
      encoding: '7bit',
      size: 100,
      destination: 'memory',
      path: 'memory',
    } as Express.Multer.File;
  });

  it('takes a buffer and returns a buffer', async () => {
    const [buffer] = await getImageFileNode(oneAspect);
    image.buffer = buffer;
    const resized = await resizeAvatarImage(buffer);
    expect(resized instanceof Buffer).toBe(true);
  });
});

describe('constructMediaUrl', () => {
  const ext = 'jpg';
  const id = 'testId';
  it('should create the correct url', () => {
    const url = constructMediaUrl({ filename: 'testId.jpg' });
    expect(url).toBe(`https://${process.env.PHOTO_BUCKET}.${process.env.IMAGE_HOST_DOMAIN}/${id}.${ext}`);
    expect(url.includes(process.env.PHOTO_BUCKET!) && url.includes('amazon')).toBe(true);
    expect(process.env.PHOTO_BUCKET).toBeDefined();
    expect(process.env.IMAGE_HOST_DOMAIN).toBeDefined();
    expect(url.includes('testId.jpg')).toBe(true);
  });
});

describe('scaleImageWidthAndHeight', () => {
  it('should scale the image to the correct dimensions for aspect ratio 1', () => {
    const scaledSm = scaleImageWidthAndHeight({ screenSize: 'sm', aspectRatio: 1 });
    expect(scaledSm.width).toBe(640);
    expect(scaledSm.height).toBe(640);
    const scaledMd = scaleImageWidthAndHeight({ screenSize: 'md', aspectRatio: 1 });
    expect(scaledMd.width).toBe(768);
    expect(scaledMd.height).toBe(768);
    const scaledLg = scaleImageWidthAndHeight({ screenSize: 'lg', aspectRatio: 1 });
    expect(scaledLg.width).toBe(1024);
    expect(scaledLg.height).toBe(1024);
  });

  it('should scale the image to the correct dimensions for aspect ratio 4:3', () => {
    const scaledSm = scaleImageWidthAndHeight({ screenSize: 'sm', aspectRatio: 4 / 3 });
    expect(scaledSm.width).toBe(640);
    expect(scaledSm.height).toBe(480);
    const scaledMd = scaleImageWidthAndHeight({ screenSize: 'md', aspectRatio: 4 / 3 });
    expect(scaledMd.width).toBe(768);
    expect(scaledMd.height).toBe(576);
    const scaledLg = scaleImageWidthAndHeight({ screenSize: 'lg', aspectRatio: 4 / 3 });
    expect(scaledLg.width).toBe(1024);
    expect(scaledLg.height).toBe(768);
  });

  it('should scale the image to the correct dimensions for aspect ratio 3:4', () => {
    const scaledSm = scaleImageWidthAndHeight({ screenSize: 'sm', aspectRatio: 3 / 4 });
    expect(scaledSm.width).toBe(480);
    expect(scaledSm.height).toBe(640);
    const scaledMd = scaleImageWidthAndHeight({ screenSize: 'md', aspectRatio: 3 / 4 });
    expect(scaledMd.width).toBe(576);
    expect(scaledMd.height).toBe(768);
    const scaledLg = scaleImageWidthAndHeight({ screenSize: 'lg', aspectRatio: 3 / 4 });
    expect(scaledLg.width).toBe(768);
    expect(scaledLg.height).toBe(1024);
  });
});

describe('getScreenImageDimensions', () => {
  it('should return the correct dimensions for aspect ratio 1', () => {
    const dimensions = getScreenImageDimensions(1);
    expect(dimensions.sm.width).toBe(640);
    expect(dimensions.sm.height).toBe(640);
    expect(dimensions.md.width).toBe(768);
    expect(dimensions.md.height).toBe(768);
    expect(dimensions.lg.width).toBe(1024);
    expect(dimensions.lg.height).toBe(1024);
  });

  it('should return the correct dimensions for aspect ratio 4:3', () => {
    const dimensions = getScreenImageDimensions(4 / 3);
    expect(dimensions.sm.width).toBe(640);
    expect(dimensions.sm.height).toBe(480);
    expect(dimensions.md.width).toBe(768);
    expect(dimensions.md.height).toBe(576);
    expect(dimensions.lg.width).toBe(1024);
    expect(dimensions.lg.height).toBe(768);
  });

  it('should return the correct dimensions for aspect ratio 3:4', () => {
    const dimensions = getScreenImageDimensions(3 / 4);
    expect(dimensions.sm.width).toBe(480);
    expect(dimensions.sm.height).toBe(640);
    expect(dimensions.md.width).toBe(576);
    expect(dimensions.md.height).toBe(768);
    expect(dimensions.lg.width).toBe(768);
    expect(dimensions.lg.height).toBe(1024);
  });
});

describe('constructStackUrl', () => {
  const id = 'testId';
  it('should create the correct url for different dimensions', () => {
    const url = constructStackUrl({
      filename: 'testId.jpg',
      dimensions: { width: 640, height: 640 },
      imageStackDomain: 'testDomain.com',
      imageStackId: 'stack-id',
    });
    expect(url).toBe(`https://stack-id.testDomain.com/fit-in/640x640/filters:upscale()/testId.jpg`);
    expect(url.includes('testDomain.com') && url.includes('stack-id')).toBe(true);
    expect(url.includes('testId.jpg')).toBe(true);
  });
});

describe('constructSrcSet', () => {
  it('constructs urls correctly for 1:1 aspect ratio', () => {
    const srcSet = constructSrcSet({
      filename: 'testId.jpg',
      imageStackDomain: 'testDomain.com',
      imageStackId: 'stack-id',
      aspectRatio: 1,
    });
    expect(srcSet).toEqual({
      sm: 'https://stack-id.testDomain.com/fit-in/640x640/filters:upscale()/testId.jpg',
      md: 'https://stack-id.testDomain.com/fit-in/768x768/filters:upscale()/testId.jpg',
      lg: 'https://stack-id.testDomain.com/fit-in/1024x1024/filters:upscale()/testId.jpg',
    });
  });

  it('constructs urls correctly for 4:3 aspect ratio', () => {
    const srcSet = constructSrcSet({
      filename: 'testId.jpg',
      imageStackDomain: 'testDomain.com',
      imageStackId: 'stack-id',
      aspectRatio: 4 / 3,
    });
    expect(srcSet).toEqual({
      sm: 'https://stack-id.testDomain.com/fit-in/640x480/filters:upscale()/testId.jpg',
      md: 'https://stack-id.testDomain.com/fit-in/768x576/filters:upscale()/testId.jpg',
      lg: 'https://stack-id.testDomain.com/fit-in/1024x768/filters:upscale()/testId.jpg',
    });
  });

  it('constructs urls correctly for 3:4 aspect ratio', () => {
    const srcSet = constructSrcSet({
      filename: 'testId.jpg',
      imageStackDomain: 'testDomain.com',
      imageStackId: 'stack-id',
      aspectRatio: 3 / 4,
    });
    expect(srcSet).toEqual({
      sm: 'https://stack-id.testDomain.com/fit-in/480x640/filters:upscale()/testId.jpg',
      md: 'https://stack-id.testDomain.com/fit-in/576x768/filters:upscale()/testId.jpg',
      lg: 'https://stack-id.testDomain.com/fit-in/768x1024/filters:upscale()/testId.jpg',
    });
  });
});
