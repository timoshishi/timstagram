import axios from '@src/lib/axios';
import type { GetCroppedImageReturn } from '@features/ImageUploader';
import { supabase } from '@src/lib/initSupabase';

export const handleAvatarSubmit = async (imageData: GetCroppedImageReturn) => {
  try {
    const formData = new FormData();
    formData.append('croppedImage', imageData.croppedImage);
    formData.append('imageData', JSON.stringify(imageData.imageData));
    await axios.put('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    await supabase.auth.refreshSession();
    await supabase.auth.session();
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
    const url = await axios.post('/post', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  } catch (error) {
    console.error('GR', error);
  }
};
