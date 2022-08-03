import { useDropzone, FileError, DropzoneState } from 'react-dropzone';
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  Context,
  Dispatch,
} from 'react';
import { getOrientation } from 'get-orientation/browser.es5';
import { Dimensions } from './imageUploader.types';
import { createImage, getRotatedImage } from './Cropper/cropper.functions';
import { SetStateAction } from 'react';
import { EmptyNoReturnFn, noOp } from '@common/utils';
import { sizeValidator } from './imageUploader.functions';

const ACCEPTED_FILE_TYPES = {
  'image/png': [],
  'image/jpeg': [],
};

const clearUrl = (url: string | null) => {
  if (url) {
    URL.revokeObjectURL(url);
  }
};

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

export const scaleImage = (
  dimensions: Dimensions,
  maxWidth: number,
  maxHeight: number
): Dimensions => {
  const scaleFactor = Math.min(
    maxWidth / dimensions.width,
    maxHeight / dimensions.height
  );
  return {
    width: dimensions.width * scaleFactor,
    height: dimensions.height * scaleFactor,
  };
};

export type ScaleImage = typeof scaleImage;
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
};

const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
};

type OrientationKey = keyof typeof ORIENTATION_TO_ANGLE;

export const useCreateUploaderContext = (): UseImageUploaderReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [cropShape, setCropShape] = useState<'round' | 'rect'>('rect');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<FileError | null>(null);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1);
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
      setOriginalAspectRatio(width / height);
      setDimensions({ width, height });
      const rotation = ORIENTATION_TO_ANGLE[orientation] ?? 0;
      if (rotation) {
        imgUrl = await getRotatedImage(imgUrl, rotation);
      }
      setPreview(imgUrl);
      setFile(file);
      return null;
    } catch (error) {
      console.error(error);
      setPreview(null);
      setFile(null);
      setError({
        code: 'invalid-file',
        message: 'File is not a valid image',
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      clearUrl(preview);
      setFile(null);
      setPreview(null);
      setError(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearFile = () => {
    clearUrl(preview);
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
      handleFile(acceptedFiles[0]).catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceptedFiles, fileRejections]);

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    preview,
    isLoading,
    error,
    file,
    originalDimensions: dimensions,
    originalAspectRatio,
    clearFile,
    scaleImage,
    cropShape,
    setCropShape,
  } as const;
};
//create a context using this file
export const ImageUploaderContext: Context<UseImageUploaderReturn> =
  createContext<UseImageUploaderReturn>({
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    isDragActive: false,
    preview: null,
    isLoading: false,
    error: null,
    file: null,
    originalDimensions: {
      width: 0,
      height: 0,
    },
    originalAspectRatio: 1,
    clearFile: noOp,
    scaleImage: () => ({ width: 0, height: 0 }),
    cropShape: 'rect',
    setCropShape: noOp,
  } as UseImageUploaderReturn);
ImageUploaderContext.displayName = 'ImageUploaderContext';
//create a provider using this file
export const useImageUploaderContext = () => useContext(ImageUploaderContext);

export const ImageUploaderProvider = ({
  children,
  initialValue,
}: {
  children: React.ReactNode;
  initialValue: UseImageUploaderReturn;
}) => {
  return (
    <ImageUploaderContext.Provider value={initialValue}>
      {children}
    </ImageUploaderContext.Provider>
  );
};
