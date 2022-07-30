import { useCallback } from 'react';
import { HandleCroppedImage } from './imageUploader.types';
import type { OnDrop } from './imageUploader.types';

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
