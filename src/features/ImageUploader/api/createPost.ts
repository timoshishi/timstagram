import axios from '@src/lib/axios';
import { Dimensions } from '../types/image-uploader.types';

export interface PostDTO {
  caption: string;
  croppedImage: File;
  imageData: {
    originalImageName: string;
    aspectRatio: number;
    dimensions: Dimensions;
  };
}

export const createPost = async (data: PostDTO) => {
  console.log({ data });
  try {
    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('croppedImage', data.croppedImage);
    formData.append('imageData', JSON.stringify(data.imageData));
  } catch (error) {
    console.error(error);
  }
};
