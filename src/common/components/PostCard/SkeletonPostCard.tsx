import { Flex, Box, useColorModeValue, SkeletonText, SkeletonCircle, Skeleton } from '@chakra-ui/react';

export interface SkeletonPostCardProps {}

export const SkeletonPostCard = ({}: SkeletonPostCardProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW='100%'
      maxH='95vw'
      borderBottomWidth={1}
      borderTopWidth={1}
      borderLeftWidth={[0, 1]}
      borderRightWidth={[0, 1]}
      rounded='lg'
      shadow={['none', 'sm', 'md']}
    >
      <Box>
        <Flex py={3} px={5} direction='row' alignItems={'center'}>
          <SkeletonCircle size={['2rem', '3rem']} />
          <Box width='6rem' ml='2'>
            <SkeletonText noOfLines={1} />
          </Box>
        </Flex>
        <Flex alignItems={'center'} justifyContent={'space-between'} px={5} mt={2}>
          <Box>
            <SkeletonText noOfLines={2} />
          </Box>
          <Skeleton height={['15rem', '20rem']} width='100%' />
        </Flex>
        <Box px='6' py={4}>
          <SkeletonText noOfLines={2} />
          <Box mt='3'>
            <SkeletonText noOfLines={1} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
