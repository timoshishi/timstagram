import { Flex, Avatar, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface PostHeaderAvatarProps {
  username: string;
  avatarUrl: string;
  isFollowing?: boolean;
  size?: 'sm' | 'md' | 'lg';
  badge?: ReactNode;
}
const sizeToTextSize = {
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
};

export const PostHeaderAvatar = ({ username, avatarUrl, isFollowing, size = 'sm', badge }: PostHeaderAvatarProps) => {
  return (
    <Flex
      alignItems='center'
      _hover={{ cursor: 'pointer' }}
      onClick={() => console.info('go to user')}
      gap={size === 'sm' ? 1 : 2}
    >
      <Avatar name={username} src={avatarUrl} size={size}>
        {badge ? badge : <></>}
      </Avatar>
      <Flex direction='column' justifyContent={'space-between'} ml={2} mt={isFollowing ? '1' : '0'}>
        <Text fontSize={sizeToTextSize[size]} fontWeight='bold' as='h2'>
          {username}
        </Text>
        {isFollowing ? (
          <Text fontSize='sm' color='blue.500'>
            followingUrlUrl
          </Text>
        ) : null}
      </Flex>
    </Flex>
  );
};
