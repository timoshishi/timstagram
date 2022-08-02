// import { useCallback } from 'react';
import { HandleCroppedImage } from './imageUploader.types';
// import type { OnDrop } from './imageUploader.types';

// export const onDrop: OnDrop = useCallback((acceptedFiles) => {
//   acceptedFiles.forEach((file) => {
//     const reader = new FileReader();

//     reader.onabort = () => console.log('file reading was aborted');
//     reader.onerror = () => console.log('file reading has failed');
//     reader.onload = () => {
//       // Do whatever you want with the file contents
//       const binaryStr = reader.result;
//       console.log(binaryStr);
//     };
//     reader.readAsArrayBuffer(file);
//   });
// }, []);

const MEGABYTE = 1000000;
const MAX_MEGABYTES = 5;
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
  //check if the file is a valid image
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
  img.onerror = () => {
    return {
      code: 'invalid-type',
      message: 'File must be a PNG or JPG',
    };
  };

  return null;
}
export const handleCroppedImage: HandleCroppedImage = ({
  croppedImage,
  croppedAreaPixels,
  aspectRatio,
}) => {
  if (croppedImage) {
    const imageData = {
      croppedImage,
      dimensions: {
        width: croppedAreaPixels.width,
        height: croppedAreaPixels.height,
      },
      aspectRatio: aspectRatio,
    };
    return imageData;
  } else {
    throw new Error('No file');
  }
};
