import axios from '@src/lib/axios';
import { GetCroppedImageReturn } from '@features/ImageUploader/types/image-uploader.types';
import { supabaseClient, logger } from '@supabase/auth-helpers-nextjs';
import { supabase } from '@src/lib/initSupabase';
import { useUser } from '@supabase/auth-helpers-react';
import { SupabaseClientOptions } from '@supabase/supabase-js';
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

    console.info('IMAGEDATA', formData.get('imageData'));
    const { data: url } = await axios.post('/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    //chanve file to buffer
    const user = await supabase.auth.refreshSession();
    const sess = await supabase.auth.session();

    // const amz = await fetch(url.url, {
    //   method: 'PUT',
    //   body: await imageData.croppedImage.arrayBuffer(),
    //   headers: { 'Content-Type': 'image/*' },
    // });
  } catch (error) {
    console.error('GR', error);
  }
};
