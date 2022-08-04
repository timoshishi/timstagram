import { useDropzone, FileError } from 'react-dropzone';
import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  Context,
} from 'react';
import { getOrientation } from 'get-orientation/browser.es5';
import type { Dimensions } from '../imageUploader.types';
import { createImage, getRotatedImage } from '../Cropper/cropper.functions';
import { noOp } from '@common/utils';
import { sizeValidator } from '../imageUploader.functions';
import type {
  UseImageUploaderReturn,
  UseCreateUploaderContextProps,
  OrientationKey,
} from './imageUploader.types';
import { readFile, scaleImage, clearUrl } from '../imageUploader.functions';

const ACCEPTED_FILE_TYPES = {
  'image/png': [],
  'image/jpeg': [],
};

export const ORIENTATION_TO_ANGLE = {
  '3': 180,
  '6': 90,
  '8': -90,
};

export const useCreateUploaderContext = ({
  type,
}: UseCreateUploaderContextProps = {}): UseImageUploaderReturn => {
  const [file, setFile] = useState<File | null>(null);
  const [cropShape, setCropShape] = useState<'round' | 'rect'>('rect');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<FileError | null>(null);
  const [originalAspectRatio, setOriginalAspectRatio] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);
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

  const setStep = (step: number) => {
    setCurrentStep(step);
  };

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
    setStep,
    currentStep,
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
    setStep: noOp,
    currentStep: 0,
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
