import { Flex, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { AvatarSizes } from 'types/index';
import { Avatar } from './Avatar';

interface PostHeaderAvatarProps {
  username: string;
  avatarFilename: string | null | undefined;
  isFollowing?: boolean;
  size?: AvatarSizes;
  badge?: ReactNode;
}
const sizeToTextSize = {
  '2xs': '1rem',
  xs: '1.25rem',
  sm: '1rem',
  md: '1rem',
  lg: '2rem',
  xl: '2.5rem',
  '2xl': '3rem',
};

export const PostHeaderAvatar = ({
  username,
  avatarFilename,
  isFollowing,
  size = 'sm',
  badge,
}: PostHeaderAvatarProps) => {
  return (
    <Flex
      alignItems='center'
      _hover={{ cursor: 'pointer' }}
      onClick={() => console.info('go to user')}
      gap={size === 'sm' ? 1 : 2}
    >
      <Avatar username={username} avatarFilename={avatarFilename} size={size} chakraAvatarProps={{ loading: 'eager' }}>
        {badge}
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
