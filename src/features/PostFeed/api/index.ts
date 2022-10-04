import axios from '@src/lib/axios';

export const togglePostLike = async (postId: string) => {
  return axios.put(`/post/${postId}/like`);
};
