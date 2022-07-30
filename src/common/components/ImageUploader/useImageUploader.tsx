import { useDropzone, FileError, DropzoneState } from 'react-dropzone';
import { useState, useEffect, useCallback } from 'react';
import { getOrientation } from 'get-orientation/browser.es5';
import { Dimensions } from './imageUploader.types';
import { createImage, getRotatedImage } from './Cropper/cropper.functions';

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

export const readFile = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });

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
  dimensions: Dimensions;
  aspectRatio: number;
};

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
};

type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;

export const useImageUploader = (): UseImageUploader => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<FileError | null>(null);
  const [aspectRatio, setAspectRatio] = useState(1);
  // const { dimensions, aspectRatio, scaleImage } = useImageDimensions(file);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

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

  const handleFile = useCallback(async (file: File) => {
    try {
      const orientation = (await getOrientation(
        file
      )) as unknown as OrientationKey;
      let imgUrl = await readFile(file);
      const image = await createImage(imgUrl);
      const { width, height } = image;
      setDimensions({ width, height });
      setAspectRatio(width / height);
      const rotation = ORIENTATION_TO_ANGLE[orientation] ?? 0;
      if (rotation) {
        imgUrl = await getRotatedImage(imgUrl, rotation);
      }
      setPreview(imgUrl);
      setFile(file);
      return null;
    } catch (error) {
      setError({
        code: 'invalid-file',
        message: 'File is not a valid image',
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      setFile(null);
      if (typeof preview === 'string') {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      handleFile(acceptedFiles[0]).catch((err) => {
        console.log(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  } as const;
};
