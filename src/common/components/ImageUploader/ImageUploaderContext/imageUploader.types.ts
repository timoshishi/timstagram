import type { Dimensions } from '../imageUploader.types';
import { SetStateAction } from 'react';
import { EmptyNoReturnFn } from '@common/utils';
import { FileError, DropzoneState } from 'react-dropzone';
import { Dispatch } from 'react';
import { ORIENTATION_TO_ANGLE } from './ImageUploaderContext';

export type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;

export type ScaleImage = (
  dimensions: Dimensions,
  maxWidth: number,
  maxHeight: number
) => Dimensions;

export type UseImageUploaderReturn = {
  file: File | null;
  error: FileError | null;
  isLoading: boolean;
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
  currentStep: number;
  setStep: (step: number) => void;
};

export interface UseCreateUploaderContextProps {
  type?: 'post' | 'avatar';
}
