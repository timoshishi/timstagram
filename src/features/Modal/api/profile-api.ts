import axios from '@src/lib/axios';
import { GetCroppedImageReturn } from '@features/ImageUploader/types/image-uploader.types';
import { supabase } from '@src/lib/initSupabase';

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
    const formData = new FormData();
    formData.append('croppedImage', imageData.croppedImage);
    formData.append('imageData', JSON.stringify(imageData.imageData));
    await axios.put('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    //chanve file to buffer
    await supabase.auth.refreshSession();
    await supabase.auth.session();
    // TODO: Post POST route - signed url can't be used if i'm altering the image on the server.
    // const amz = await fetch(url.url, {
    //   method: 'PUT',
    //   body: await imageData.croppedImage.arrayBuffer(),
    //   headers: { 'Content-Type': 'image/*' },
    // });
  } catch (error) {
    console.error('GR', error);
  }
};
export const updateProfile = async ({ bio }: { bio: string }) => {
  try {
    const { data } = await axios.put('/profile', { bio });
    await supabase.auth.update({
      data: { bio },
    });
    await supabase.auth.refreshSession();
    await supabase.auth.session();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async () => {
  try {
    await axios.delete('/profile');
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

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
    await axios.put('/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    //chanve file to buffer
    // TODO: Post POST route - signed url can't be used if i'm altering the image on the server.
    // const amz = await fetch(url.url, {
    //   method: 'PUT',
    //   body: await imageData.croppedImage.arrayBuffer(),
    //   headers: { 'Content-Type': 'image/*' },
    // });
  } catch (error) {
    console.error('GR', error);
  }
};
