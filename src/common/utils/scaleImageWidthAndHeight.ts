import { Dimensions } from '@features/ImageUploader';
import { ImageSourceSizes } from 'types/post';

export const scaleImageWidthAndHeight = ({
  screenSize,
  aspectRatio,
}: {
  screenSize: ImageSourceSizes;
  aspectRatio: number;
}): Dimensions => {
  const maxImageWidth = {
    sm: 640,
    md: 768,
    lg: 1024,
  }[screenSize];
  //if the aspect ratio is less than 1, we need to scale the height instead of the width
  const scaledWidth = aspectRatio < 1 ? maxImageWidth * aspectRatio : maxImageWidth;
  const scaledHeight = aspectRatio < 1 ? maxImageWidth : maxImageWidth / aspectRatio;
  return {
    width: Math.round(scaledWidth),
    height: Math.round(scaledHeight),
  };
};
