import { useBreakpointValue } from '@chakra-ui/react';
import { useUser } from '@common/hooks/useUser';
import { NextPageWithLayout } from 'types/page';
import { SWRConfig } from 'swr';
import useSWRInfinite from 'swr/infinite';
import getFeed from '@src/api/getFeed';
import { PostFeed } from '@features/PostFeed';
import { fetcher } from 'src/lib/axios';
import { ImageSourceSizes, PostResponse } from 'types/post';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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

  // refresh the feed if the user signs out
  useEffect(() => {
    mutate([], {
      revalidate: true,
    });
  }, [user]);

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
      <PostFeed
        postResponses={postResponses}
        imgSize={imgSize}
        setResponseArraySize={setSize}
        responseArraySize={size}
      />
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
