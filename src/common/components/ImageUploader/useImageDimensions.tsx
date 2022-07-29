import { useState, useEffect } from 'react';

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

export const useImageDimensions = (file: File | null): UseImageUploader => {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });
  const [aspectRatio, setAspectRatio] = useState<number>(0);
  useEffect(() => {
    if (file) {
      // read the file and get the dimensions
      let reader: FileReader | null = new FileReader();
      //turn the file into something I can read
      reader.readAsDataURL(file);
      //when the file is loaded, get the dimensions
      reader.onload = () => {
        let img: HTMLImageElement | null = new Image();
        img.src = reader?.result as string;
        img.onload = () => {
          let height = img?.height ?? 0;
          let width = img?.width ?? 0;
          let aspectRatio = width / height;
          setDimensions({
            width,
            height,
          });
          setAspectRatio(!isNaN(aspectRatio) ? aspectRatio : 0);
          reader = null;
          img = null;
        };
      };
    } else {
      setDimensions({ width: 0, height: 0 });
      setAspectRatio(0);
    }
  }, [file]);
  const scaleImage = (
    dimensions: {
      width: number;
      height: number;
    },
    maxWidth: number,
    maxHeight: number
  ) => {
    const scaleFactor = Math.min(
      maxWidth / dimensions.width,
      maxHeight / dimensions.height
    );
    return {
      width: dimensions.width * scaleFactor,
      height: dimensions.height * scaleFactor,
    };
  };
  return { dimensions, aspectRatio, scaleImage };
};
