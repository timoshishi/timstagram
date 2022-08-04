import { Area as EasyCropArea } from 'react-easy-crop';
import { ORIENTATION_TO_ANGLE } from './ImageUploaderContext';
export type Area = EasyCropArea;

export type OnDrop = (files: File[]) => void;

export type ScaleImage = (
  dimensions: {
    width: number;
    height: number;
  },
  maxWidth: number,
  maxHeight: number
) => {
  width: number;
  height: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type AspectRatio = number;

export type UseImageUploader = {
  dimensions: Dimensions;
  aspectRatio: AspectRatio;
  scaleImage: ScaleImage;
};

export interface CroppedImage {
  croppedImage: File;
  dimensions: Dimensions;
  aspectRatio: number;
}

export type HandleCroppedImage = (params: {
  croppedImage: File | null;
  croppedAreaPixels: Area;
  aspectRatio: number;
}) => CroppedImage | null;

type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;
interface UseCreateUploaderContextProps {
  type?: 'post' | 'avatar';
}
