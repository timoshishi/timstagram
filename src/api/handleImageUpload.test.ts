import {
  getImageProperties,
  ImageProperties,
  getAltText,
  getImageHash,
  createPlaceholder,
  resizeAvatarImage,
  constructUploadUrl,
} from './handleImageUpload';
import { promises } from 'fs';
import path from 'path';
import { UUIDReg } from '@common/utils/regexp';
const fixturesDir = path.join(__dirname, '../../__mocks__/fixtures');
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

describe('constructUploadUrl', () => {
  const ext = 'jpg';
  const id = 'testId';
  it('should create the correct url', () => {
    const url = constructUploadUrl({ ext, id });
    expect(url).toBe(`https://${process.env.PHOTO_BUCKET}.s3.amazonaws.com/${id}.${ext}`);
  });
});
