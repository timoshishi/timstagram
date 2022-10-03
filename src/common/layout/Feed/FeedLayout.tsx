import { Box, VStack, Show } from '@chakra-ui/react';

export const FeedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box w='100%' h='100%' display='flex' flexDirection='row' justifyContent={'center'} data-testid='feed-layout'>
      <Box
        w={['100%', '90%', '90%', '70%', '70%']}
        ml={[0, '20%']}
        minH='100vh'
        mt='60px'
        maxW='100%'
        display='flex'
        justifyContent={'center'}
        alignItems={'flex-start'}
        flexDir={'row'}
        data-testid='feed-layout-main'
      >
        <VStack spacing={10} flexGrow={1} h='100%' rowGap={12} columnGap={4} px={[0]} ml={[0]}>
          {children}
        </VStack>
        <Show above='md' ssr>
          <Box
            minW={['0px', '250px', '250px', '300px']}
            bg='orange'
            maxH='80vh'
            minH='60vh'
            position='sticky'
            top={'60px'}
            borderRadius={5}
            shadow={'md'}
            ml={[0, '15px']}
            data-testid='feed-layout-sidebar'
          />
        </Show>
      </Box>
    </Box>
  );
};
