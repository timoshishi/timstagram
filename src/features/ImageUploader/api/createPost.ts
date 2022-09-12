import { ImageData } from '../types/image-uploader.types';

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
    console.info(formData.get('imageData'));
  } catch (error) {
    console.error(error);
  }
};
