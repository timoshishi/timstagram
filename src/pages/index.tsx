import { Box, HStack, Show, VStack } from '@chakra-ui/react';
import { useUser } from '@common/hooks/useUser';
import { NextPageWithLayout } from 'types/page.types';
import { SWRConfig } from 'swr';
import useSWRInfinite, { SWRInfiniteResponse } from 'swr/infinite';
import getFeed from '@src/api/getFeed';
import { PostCard } from '@common/components/PostCard';
import { fetcher } from 'src/lib/axios';
import { PostResponse } from 'types/post.types';
const API = '/post/popular';

export async function getStaticProps() {
  const posts: PostResponse = await getFeed();
  return {
    revalidate: 600,
    props: {
      fallback: {
        [API]: posts,
      },
    },
  };
}
const PAGE_SIZE = 25;

const getKey = (pageIndex: number, previousPageData: PostResponse) => {
  if (previousPageData && !previousPageData.data.length) return null;
  if (pageIndex === 0) return `${API}?page=${1}&limit=${PAGE_SIZE}`;
  return `${API}?page=${previousPageData.page + 1}&limit=${PAGE_SIZE}`;
};

const Feed: NextPageWithLayout = () => {
  const { user, error, isLoading } = useUser();

  const { data, error: feedError, mutate, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);
  let postResponses: PostResponse[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;

  return (
    <Box w='full' minH='100vh' mt='60px' maxW='100%'>
      <HStack w='100%' alignItems='flex-start' rowGap={12} columnGap={4} pt={50}>
        <VStack spacing={10} justifyContent='flex-start' flexGrow={1} h='100%'>
          {postResponses.map(({ data: posts, page }) =>
            posts.map((post, currentIdx) => (
              <Box w='100%' key={post.postId}>
                <PostCard
                  post={post}
                  setSize={setSize}
                  size={size}
                  refreshIdx={PAGE_SIZE - 5}
                  currentIdx={currentIdx}
                  page={page}
                />
              </Box>
            ))
          )}
        </VStack>
        <Show above='lg' ssr>
          <Box w='200px' bg='orange' h='450px' mt='30rem' />
        </Show>
      </HStack>
    </Box>
  );
};
export default function SWRPage({ fallback }: { fallback: any }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Feed />
    </SWRConfig>
  );
}
