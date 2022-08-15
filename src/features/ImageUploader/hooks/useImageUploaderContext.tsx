import { useContext } from 'react';
import { ImageUploaderContext } from '../stores';
import { UseImageUploaderReturn } from '../types/image-uploader-context.types';

export const useImageUploaderContext = (): UseImageUploaderReturn => {
  const context = useContext(ImageUploaderContext);
  if (!context) {
    throw new Error('useImageUploaderContext must be used within ImageUploaderContext');
  }
  return context;
};
