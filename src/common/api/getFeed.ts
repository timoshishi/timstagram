import { PostCardProps } from '@common/components/PostCard';
import { createPost } from '../../../__mocks__/fixtures/post';
const getFeed = async () => {
  return Promise.resolve([...new Array(100)].map(createPost)) as Promise<
    PostCardProps[]
  >;
};
export default getFeed;
