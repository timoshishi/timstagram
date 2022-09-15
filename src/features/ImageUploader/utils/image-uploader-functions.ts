import type { Dimensions, HandleCroppedImage } from '../types';
import { MEGABYTE, MAX_MEGABYTES } from './image-uploader.constants';

export function sizeValidator(file: File) {
  if (file.size > MEGABYTE * MAX_MEGABYTES) {
    return {
      code: 'too-large',
      message: ` File is too large. Max size is ${MAX_MEGABYTES}MB.`,
    };
  }
  // check if the file is an image
  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    return {
      code: 'invalid-type',
      message: 'File must be a PNG or JPG',
    };
  }
  //check if the file is a valid imagefq
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    if (img.width < 300 || img.height < 300) {
      return {
        code: 'invalid-type',
        message: 'Image must be at least 300px by 300px',
      };
    }
    URL.revokeObjectURL(img.src);
  };

  return null;
}

export const handleCroppedImage: HandleCroppedImage = ({
  croppedImage,
  croppedAreaPixels,
  aspectRatio,
  originalImageName,
}) => {
  if (croppedImage) {
    const imageData = {
      dimensions: {
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      },
      aspectRatio,
      originalImageName,
    };
    return { croppedImage, imageData };
  } else {
    return null;
  }
};

export const clearUrl = (url: string | null) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

export const readFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });

export const scaleImage = (dimensions: Dimensions, maxWidth: number, maxHeight: number): Dimensions => {
  const scaleFactor = Math.min(maxWidth / dimensions.width, maxHeight / dimensions.height);
  return {
    width: dimensions.width * scaleFactor,
    height: dimensions.height * scaleFactor,
  };
};
