import { Box, VStack, Show } from '@chakra-ui/react';
import { PostResponse } from 'types/post.types';
import { SkeletonPostCard } from '@common/components/PostCard/SkeletonPostCard';

export const FeedLayout = ({
  feedResponse,
  sidebarData = null,
}: {
  feedResponse?: PostResponse | undefined;
  sidebarData?: null;
}) => {
  return (
    <Box w='100%' h='100%' display='flex' flexDirection='row' justifyContent={'center'}>
      <Box
        w={['100vw', '80vw', '60vw']}
        minH='100vh'
        mt='60px'
        maxW='100%'
        display='flex'
        justifyContent={'center'}
        alignItems={'flex-start'}
        flexDir={'row'}
      >
        {/* <HStack w={['100%', '80%']} rowGap={12} columnGap={4} pt={50} justifyContent='center' alignItems='flex-start'> */}
        <VStack spacing={10} flexGrow={1} h='100%' rowGap={12} columnGap={4} px={[0, 4]}>
          {!feedResponse ? (
            <>
              {new Array(5).fill(
                <Box w='100%'>
                  <SkeletonPostCard />
                </Box>
              )}
            </>
          ) : null}
        </VStack>
        {/* </HStack> */}
        <Show above='md' ssr>
          <Box
            minW={['0px', '250px', '300px', '350px']}
            bg='orange'
            maxH='80vh'
            minH='60vh'
            position='sticky'
            top={'60px'}
            borderRadius={10}
            shadow={'md'}
          />
        </Show>
      </Box>
    </Box>
  );
};
