import { Flex, Avatar, Text } from '@chakra-ui/react';

interface PostHeaderAvatarProps {
  username: string;
  avatarUrl: string;
  isFollowing?: boolean;
}

export const PostHeaderAvatar = ({ username, avatarUrl, isFollowing }: PostHeaderAvatarProps) => {
  return (
    <Flex alignItems='center' _hover={{ cursor: 'pointer' }} onClick={() => console.info('go to user')}>
      <Avatar name={username} src={avatarUrl} size='sm' />
      <Flex direction='column' justifyContent={'space-between'} ml={2} mt={isFollowing ? '1' : '0'}>
        <Text fontSize='md' fontWeight='bold'>
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
