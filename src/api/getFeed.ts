import { Post, PostResponse } from 'types/post.types';
import { randomIntInRange } from '@common/utils';
import { createPost } from '../../__mocks__/fixtures/post';
const getFeed = async (size = 15, page = 1): Promise<PostResponse> => {
  const posts: Post[] = [...new Array(size)].map(createPost);
  return Promise.resolve({
    data: posts,
    total: randomIntInRange(100, 10000),
    page: page,
  }) as Promise<PostResponse>;
};
export default getFeed;
