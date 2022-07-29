import { useDropzone, FileError, DropzoneState } from 'react-dropzone';
import { useState, useEffect } from 'react';
import {
  Dimensions,
  ScaleImage,
  useImageDimensions,
} from './useImageDimensions';
const MEGABYTE = 1000000;
const MAX_MEGABYTES = 5;
const ACCEPTED_FILE_TYPES = {
  'image/png': [],
  'image/jpeg': [],
};
function sizeValidator(file: File) {
  if (file.size > MEGABYTE * MAX_MEGABYTES) {
    return {
      code: 'too-large',
      message: ` File is too large. Max size is ${MAX_MEGABYTES}MB.`,
    };
  }
  // check if the file is an image
  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    return {
      code: 'invalid-type',
      message: 'File must be a PNG or JPG',
    };
  }
  //check if the file is a valid image
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    if (img.width < 300 || img.height < 300) {
      return {
        code: 'invalid-type',
        message: 'Image must be at least 300px by 300px',
      };
    }
    URL.revokeObjectURL(img.src);
  };
  img.onerror = () => {
    return {
      code: 'invalid-type',
      message: 'File must be a PNG or JPG',
    };
  };

  return null;
}

export type UseImageUploader = {
  file: File | null;
  error: FileError | null;
  isLoading: boolean;
  getRootProps: DropzoneState['getRootProps'];
  getInputProps: DropzoneState['getInputProps'];
  isDragActive: DropzoneState['isDragActive'];
  clearPreviewOnLoad: () => void;
  preview: string | null;
  clearFile: () => void;
  scaleImage: ScaleImage;
  dimensions: Dimensions;
  aspectRatio: number;
};

export const useImageUploader = (): UseImageUploader => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<FileError | null>(null);
  const { dimensions, aspectRatio, scaleImage } = useImageDimensions(file);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    maxFiles: 1,
    multiple: false,
    validator: sizeValidator,
    accept: ACCEPTED_FILE_TYPES,
  });

  useEffect(() => {
    return () => {
      setFile(null);
      if (typeof preview === 'string') {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      setError(null);
    };
  }, []);

  const clearPreviewOnLoad = () => () => {
    if (typeof preview === 'string') {
      URL.revokeObjectURL(preview);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
  };
  useEffect(() => {
    if (fileRejections.length > 0) {
      setError(fileRejections[0].errors[0]);
      setFile(null);
    }
    if (acceptedFiles.length > 0) {
      setError(null);
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles, fileRejections]);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    clearPreviewOnLoad,
    preview,
    isLoading,
    error,
    file,
    dimensions,
    aspectRatio,
    clearFile,
    scaleImage,
  } as const;
};
