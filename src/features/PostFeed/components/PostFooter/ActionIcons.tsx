import { Flex, Box, Text, Icon, chakra, useColorModeValue } from '@chakra-ui/react';
import { FaRegCommentAlt, FaShare } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';

interface ActionIconsProps {
  hasLiked: boolean;
  likesCount: number;
}

export const ActionIcons = ({ hasLiked, likesCount }: ActionIconsProps) => {
  const colorMode = useColorModeValue('gray.800', 'white');
  return (
    <Flex direction='column'>
      <Flex columnGap={4}>
        <chakra.button onClick={() => console.info('share post')} display={'flex'} color='blue.600'>
          <Icon as={FaShare} h={7} w={7} alignSelf={'center'} />
        </chakra.button>
        <chakra.button onClick={() => console.info('comment on post')} display={'flex'}>
          <Icon as={FaRegCommentAlt} h={7} w={7} alignSelf={'center'} />
        </chakra.button>
        <chakra.button onClick={() => console.info('like post')} display={'flex'}>
          <Icon
            as={FiHeart}
            h={7}
            w={7}
            alignSelf={'center'}
            fill={hasLiked ? 'red' : ''}
            color={hasLiked ? 'red' : 'black'}
            stroke={hasLiked ? 'blackAlpha.200' : 'blackAlpha.900'}
          />
        </chakra.button>
      </Flex>
      {likesCount ? (
        <Box color={colorMode} textAlign='end' onClick={() => console.info('open post modal')}>
          <Text fontSize='md' color='purple.500'>
            {`${likesCount} like${likesCount !== 1 ? 's' : ''}`}
          </Text>
        </Box>
      ) : null}
    </Flex>
  );
};
