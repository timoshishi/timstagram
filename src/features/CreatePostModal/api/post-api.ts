import { GetCroppedImageReturn } from '@features/ImageUploader/types/image-uploader.types';
import axios from '@src/lib/axios';

export const handlePostSubmit = async ({
  imageData,
  caption,
}: {
  imageData: GetCroppedImageReturn;
  caption: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('croppedImage', imageData.croppedImage);
    formData.append('imageData', JSON.stringify(imageData.imageData));
    formData.append('caption', caption);

    const {
      data: { signedUrl },
    } = await axios.post('/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: await imageData.croppedImage.arrayBuffer(),
      headers: { 'Content-Type': 'image/*' },
    });

    if (response.status !== 200) {
      throw new Error(JSON.stringify(response));
    }
  } catch (error) {
    console.error(error);
  }
};
