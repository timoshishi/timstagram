import { Flex, Avatar, Text } from '@chakra-ui/react';

interface PostHeaderAvatarProps {
  username: string;
  avatarURL: string;
  isFollowing: boolean;
}

export const PostHeaderAvatar = ({
  username,
  avatarURL,
  isFollowing,
}: PostHeaderAvatarProps) => {
  return (
    <Flex
      alignItems='center'
      _hover={{ cursor: 'pointer' }}
      onClick={() => console.log('go to user')}>
      <Avatar name={username} src={avatarURL} size='sm' />
      <Flex
        direction='column'
        justifyContent={'space-between'}
        ml={2}
        mt={isFollowing ? '1' : '0'}>
        <Text fontSize='md' fontWeight='bold'>
          {username}
        </Text>
        {isFollowing ? (
          <Text fontSize='sm' color='blue.500'>
            following
          </Text>
        ) : null}
      </Flex>
    </Flex>
  );
};
