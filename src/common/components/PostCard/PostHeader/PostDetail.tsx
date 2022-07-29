import { Flex, Icon, Text } from '@chakra-ui/react';
import { FaShare, FaEye } from 'react-icons/fa';

interface PostDetailProps {
  repostsCount: number;
  viewsCount: number;
}

export const PostDetail = ({ repostsCount, viewsCount }: PostDetailProps) => (
  <Flex columnGap={2} direction='row'>
    <Flex alignItems='center'>
      <Icon as={FaShare} color='blue.600' size={16} />
      <Text fontSize='sm' ml={1}>
        {repostsCount} share{repostsCount !== 1 ? 's' : ''}
      </Text>
    </Flex>
    <Flex alignItems='center'>
      <Icon as={FaEye} color='green.500' size={16} />
      <Text fontSize='sm' ml={1}>
        {viewsCount} view{viewsCount !== 1 ? 's' : ''}
      </Text>
    </Flex>
  </Flex>
);
