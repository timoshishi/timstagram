import { useContext } from 'react';
import { ImageUploaderContext } from '../stores';
import { UseImageUploaderReturn } from '../types/image-uploader-context.types';

export const useImageUploader = (): UseImageUploaderReturn => {
  const context = useContext(ImageUploaderContext);
  if (!context) {
    throw new Error('useImageUploader must be used within ImageUploaderContext');
  }
  return context;
};
