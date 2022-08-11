import { useContext } from 'react';
import { ImageUploaderContext } from '../stores';
import { UseImageUploaderReturn } from '../types/image-uploader-context.types';

export const useImageUploaderContext = (): UseImageUploaderReturn => useContext(ImageUploaderContext);
