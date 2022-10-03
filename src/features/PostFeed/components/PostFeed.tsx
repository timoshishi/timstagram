import { FeedLayout } from '@common/layout/Feed';
import { ImageSourceSizes, PostResponse } from 'types/post';
import { PostCard } from '@features/PostFeed';
import { Box } from '@chakra-ui/react';
import { PAGE_SIZE } from '@common/constants';
import { SkeletonPostCard } from '@features/PostFeed';
import { useUser } from '@common/hooks/useUser';
import { PostCardProvider } from '../stores/PostCardProvider';

export interface PostFeedProps {
  postResponses: PostResponse[];
  imgSize?: ImageSourceSizes;
  responseArraySize: number;
  setResponseArraySize: (size: number) => void;
}

export const PostFeed = ({ postResponses, imgSize, setResponseArraySize, responseArraySize }: PostFeedProps) => {
  const { user } = useUser();
  return (
    <FeedLayout>
      {postResponses && typeof imgSize !== undefined ? (
        postResponses.map(({ data: posts, page }) =>
          posts.map((post, currentIdx) => (
            <Box w='100%' key={post.postId}>
              <PostCardProvider
                post={post}
                setSize={setResponseArraySize}
                currentIdx={currentIdx}
                size={responseArraySize}
                refreshIdx={PAGE_SIZE - 5}
                page={page}
                imgSize={imgSize}
                user={user}
              >
                <PostCard
                  post={post}
                  imgSize={imgSize}
                  setSize={setResponseArraySize}
                  size={responseArraySize}
                  refreshIdx={PAGE_SIZE - 5}
                  currentIdx={currentIdx}
                  page={page}
                  user={user}
                />
              </PostCardProvider>
            </Box>
          ))
        )
      ) : (
        <SkeletonPostCard />
      )}
    </FeedLayout>
  );
};
