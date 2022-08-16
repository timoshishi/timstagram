import axios from '@src/lib/axios';
import { GetCroppedImageReturn } from '@features/ImageUploader/types/image-uploader.types';

export type CreateProfileParams = {
  id: string;
  username: string;
};

export const insertInitialProfileData = async ({ id, username }: CreateProfileParams) => {
  const { data } = await axios.post('/profile', {
    id,
    username,
  });
  return data;
};

export const handleAvatarSubmit = async (imageData: GetCroppedImageReturn) => {
  try {
    console.log('submitting avatar', imageData);
    const formData = new FormData();
    formData.append('croppedImage', imageData.croppedImage);
    formData.append('imageData', JSON.stringify(imageData.imageData));

    console.info('IMAGEDATA', formData.get('imageData'));
    const { data: url } = await axios.post('/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    //chanve file to buffer
    console.log('url', url);
    const amz = await fetch(url.url, {
      method: 'PUT',
      body: await imageData.croppedImage.arrayBuffer(),
      headers: { 'Content-Type': 'image/*' },
    });
    console.log('amz', amz);
  } catch (error) {
    console.error('GR', error);
  }
};
