import { scaleImage, sizeValidator, readFile, handleCroppedImage } from './image-uploader-functions';
import { MAX_MEGABYTES, MEGABYTE } from './image-uploader.constants';
import { Dimensions } from '../types/image-uploader.types';

/*
export class Component {
  object = {
    image: ''
  };
  handleFileUpload(event) {
    let reader = new FileReader();
    let file = event.target.files[0];

    reader.readAsBinaryString(file);

    reader.onload = () => {
      let base64String = btoa(reader.result as string);
      this.object.image = base64String;
    };

    return reader;
  }
}
*/
/*
import { Component } from './';

const cmp = new Component();

describe('main', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  test('should test handle file upload correctly', () => {
    const mFile = new File(['go'], 'go.pdf');
    const mEvent = { target: { files: [mFile] } };
    const readAsBinaryStringSpy = jest.spyOn(FileReader.prototype, 'readAsBinaryString');
    const btoaSpy = jest.spyOn(window, 'btoa');
    const reader = cmp.handleFileUpload(mEvent);
    expect(reader).toBeInstanceOf(FileReader);
    if (reader.onload) {
      Object.defineProperty(reader, 'result', { value: 'gogo' });
      const mOnloadEvent = {} as any;
      reader.onload(mOnloadEvent);
      expect(btoaSpy).toBeCalledWith('gogo');
      expect(cmp.object.image).toBe(btoa('gogo'));
    }
    expect(readAsBinaryStringSpy).toBeCalledWith(mFile);
  });
});
*/

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

describe('handleCroppedImage', () => {
  let fle: any = 'asdfdasf';
  let area = { width: 10, height: 10, x: 0, y: 0 };
  it('returrns null if an invalid file is passed as an argument', () => {
    expect(
      handleCroppedImage({
        croppedImage: undefined as any as File,
        croppedAreaPixels: area,
        aspectRatio: 1,
      })
    ).toBeNull();
  });

  it('returns the correct properties if it is passed an image', () => {
    const file = new File(['heresisssoedata'], 'filetype.png', {
      lastModified: Date.now(),
      type: 'image/png',
    });
    const result = handleCroppedImage({
      croppedImage: file,
      croppedAreaPixels: area,
      aspectRatio: 0.5,
    });
    expect(result).toEqual({
      croppedImage: file,
      dimensions: {
        width: area.width,
        height: area.height,
      },
      aspectRatio: 0.5,
    });
  });
});
