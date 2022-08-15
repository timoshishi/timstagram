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
  console.log('submitting avatar', imageData);
  const formData = new FormData();
  formData.append('files', imageData.croppedImage);
  formData.append('imageData', JSON.stringify(imageData.imageData));
  await axios.post('/profile/avatar', formData);
  console.info(formData.get('imageData'));
};
