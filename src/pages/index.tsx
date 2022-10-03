import { Box, useBreakpointValue } from '@chakra-ui/react';
import { useUser } from '@common/hooks/useUser';
import { NextPageWithLayout } from 'types/page';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import getFeed from '@src/api/getFeed';
import { PostCard } from '@features/PostFeed';
import { fetcher } from 'src/lib/axios';
import { ImageSourceSizes, PostResponse } from 'types/post';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { SkeletonPostCard } from '@features/PostFeed';
import { FeedLayout } from '@common/layout/Feed';
const API = '/feed/popular';
const PAGE_SIZE = 25;

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

const getKey = (pageIndex: number, previousPageData: PostResponse) => {
  if (previousPageData && !previousPageData.data.length) return null;
  if (pageIndex === 0) return `${API}?page=${1}&limit=${PAGE_SIZE}`;
  return `${API}?page=${previousPageData.page + 1}&limit=${PAGE_SIZE}`;
};

const Feed: NextPageWithLayout = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const imgSize: ImageSourceSizes | undefined = useBreakpointValue({ base: 'sm', md: 'md', lg: 'lg' });
  const { data, error: feedError, mutate, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher);

  let postResponses: PostResponse[] = data ? [].concat(...data) : [];

  const isLoadingInitialData = !data && !error;

  const title = `${process.env.NEXT_PUBLIC_APP_NAME} | Feed`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          meta-description='coolest site on the whole darn internet'
        />
      </Head>
      <FeedLayout>
        {postResponses && typeof imgSize !== undefined ? (
          postResponses.map(({ data: posts, page }) =>
            posts.map((post, currentIdx) => (
              <Box w='100%' key={post.postId}>
                <PostCard
                  post={post}
                  imgSize={imgSize}
                  setSize={setSize}
                  size={size}
                  refreshIdx={PAGE_SIZE - 5}
                  currentIdx={currentIdx}
                  page={page}
                />
              </Box>
            ))
          )
        ) : (
          <SkeletonPostCard />
        )}
      </FeedLayout>
    </>
  );
};
export default function SWRPage({ fallback }: { fallback: any }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Feed />
    </SWRConfig>
  );
}
