import axios from '@src/lib/axios';

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
