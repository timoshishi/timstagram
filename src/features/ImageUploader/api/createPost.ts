import axios from '@src/lib/axios';
import { Dimensions } from '../types/image-uploader.types';

export interface ImageData {
  originalImageName: string;
  aspectRatio: number;
  dimensions: Dimensions;
}
export interface PostDTO {
  caption: string;
  croppedImage: File;
  imageData: ImageData;
}

export const createPost = async (data: PostDTO) => {
  try {
    const formData = new FormData();
    formData.append('caption', data.caption);
    formData.append('files', data.croppedImage);
    formData.append('imageData', JSON.stringify(data.imageData));
    console.log(formData.get('imageData'));
  } catch (error) {
    console.error(error);
  }
};
