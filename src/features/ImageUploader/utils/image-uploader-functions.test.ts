import { scaleImage, sizeValidator, readFile } from './image-uploader-functions';
import { MAX_MEGABYTES, MEGABYTE } from './image-uploader.constants';
import type { Dimensions } from '../types';

describe('sizeValidator', () => {
  it('returns an error that the file is too large if it is above max_megabytes', () => {
    const file = new File(['*2'.repeat(MAX_MEGABYTES * MEGABYTE)], 'image-mock.jpeg', {
      lastModified: Date.now(),
      type: 'image/png',
    });
    const result = sizeValidator(file);
    let message = {
      code: 'too-large',
      message: ` File is too large. Max size is ${MAX_MEGABYTES}MB.`,
    };
    expect(result).toEqual(message);
  });

  it('returns an error object if the file is not a png or jpeg', () => {
    const file = new File(['herses domse dadta'], 'file.pdf', {
      lastModified: Date.now(),
      type: 'pdf',
    });
    const result = sizeValidator(file);
    expect(result).toStrictEqual({
      code: 'invalid-type',
      message: 'File must be a PNG or JPG',
    });
  });
});

describe('scaleImage', () => {
  let dimensions: Dimensions = {
    width: 200,
    height: 100,
  };

  afterEach(() => {
    dimensions = { width: 200, height: 100 };
  });
  it('returns a size bigger than the image if if the maxWidth is bigger than the image dimensions passed in', () => {
    const result = scaleImage(dimensions, 400, 200);
    expect(result).toEqual({
      width: 400,
      height: 200,
    });
  });
  it('returns a size smaller than the image if the maxWidth is smaller than the image dimensions passed in and the maxHeight is smaller than the max width', () => {
    const result = scaleImage(dimensions, 100, 50);
    expect(result).toEqual({
      width: 100,
      height: 50,
    });
  });
  it('returns a size bigger than the image if if the maxHeight is bigger than the image dimensions passed in', () => {
    const result = scaleImage(dimensions, 10000, 400);
    expect(result).toEqual({
      width: 800,
      height: 400,
    });
  });
});

describe('readFile', () => {
  let file: File;
  beforeEach(() => {
    file = new File(['werehwriewirhewr'], 'thisfile.img', {
      lastModified: Date.now(),
      type: 'pdf',
    });
  });

  it('returns a promise', () => {
    const fle = readFile(file);
    expect(fle).toBeInstanceOf(Promise);
  });
  it('returns a string', async () => {
    const res = await readFile(file);
    expect(typeof res).toBe('string');
  });
  it('rejects if given an invalid file', async () => {
    let fale: any = 'asdfaewfad';
    readFile(fale as File)
      .then()
      .catch((err) => {
        expect(err).toBeInstanceOf(Error);
      });
  });
});
