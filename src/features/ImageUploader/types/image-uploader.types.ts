import { Area as EasyCropArea } from 'react-easy-crop';
import { ORIENTATION_TO_ANGLE } from '../stores/ImageUploaderContext';

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
  originalImageName: string;
}) => GetCroppedImageReturn | null;
export interface ImageData {
  originalImageName: string;
  aspectRatio: number;
  dimensions: Dimensions;
}
export interface GetCroppedImageReturn {
  croppedImage: File;
  imageData: ImageData;
}

export type GetCroppedImage = () => Promise<void>;

type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;
interface UseCreateUploaderContextProps {
  type?: 'post' | 'avatar';
}

// type GetCroppedImage = (image: string, pixelCrop: Area, rotation: number) => Promise<Blob>;
