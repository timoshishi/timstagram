import { useContext } from 'react';
import { ImageUploaderContext } from '../stores';
import type { UseImageUploaderReturn } from '../types';

export const useImageUploader = (): UseImageUploaderReturn => {
  const context = useContext(ImageUploaderContext);
  if (!context) {
    throw new Error('useImageUploader must be used within ImageUploaderContext');
  }
  return context;
};
