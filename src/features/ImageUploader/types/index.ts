import type { Area as EasyCropArea } from 'react-easy-crop';
import type { SetStateAction } from 'react';
import type { EmptyNoReturnFn } from '@common/utils';
import type { FileError, DropzoneState } from 'react-dropzone';
import type { Dispatch } from 'react';
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

export type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;

export type UseImageUploaderReturn = {
  file: File | null;
  error: FileError | null;
  getRootProps: DropzoneState['getRootProps'];
  getInputProps: DropzoneState['getInputProps'];
  isDragActive: DropzoneState['isDragActive'];
  preview: string | null;
  clearFile: EmptyNoReturnFn;
  originalDimensions: Dimensions;
  originalAspectRatio: number;
  scaleImage: ScaleImage;
  cropShape: 'round' | 'rect';
  setCropShape: Dispatch<SetStateAction<'round' | 'rect'>>;
  isUploaderLoading: boolean;
  toggleUploaderLoading: () => void;
  croppedImage: GetCroppedImageReturn | null;
  setCroppedImage: Dispatch<SetStateAction<GetCroppedImageReturn | null>>;
  hasAdditionalStep: boolean;
  shape: 'rect' | 'round';
  setPreview: Dispatch<SetStateAction<string | null>>;
};

export interface UseCreateUploaderContextProps {
  shape?: 'rect' | 'round';
  hasAdditionalStep?: boolean;
}

// type GetCroppedImage = (image: string, pixelCrop: Area, rotation: number) => Promise<Blob>;
