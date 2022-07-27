import { Box, HStack, Show, VStack } from '@chakra-ui/react';
import useUser from '@common/hooks/useUser';
import { NextPageWithLayout } from 'types/page-types';
import useSWR, { SWRConfig, SWRResponse } from 'swr';
import getFeed from '@common/api/getFeed';
import { PostCard, PostCardProps } from '@common/components/PostCard';

const API = '/post/popular';

export async function getStaticProps() {
  const feed: PostCardProps[] = await getFeed();
  return {
    revalidate: 600,
    props: {
      fallback: {
        [API]: feed,
      },
    },
  };
}

const Feed: NextPageWithLayout = () => {
  const { user, error, isLoading } = useUser();
  const { data, error: feedError }: SWRResponse<PostCardProps[], any> =
    useSWR(API);

  return (
    <Box w='full' minH='100vh' mt='60px' maxW='100%'>
      <HStack
        w='100%'
        alignItems='flex-start'
        rowGap={12}
        columnGap={4}
        pt={50}>
        <VStack spacing={10} justifyContent='flex-start' flexGrow={1} h='100%'>
          {data?.map((post) => (
            <Box w='100%' key={post.postId}>
              <PostCard post={post} />
            </Box>
          ))}
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
