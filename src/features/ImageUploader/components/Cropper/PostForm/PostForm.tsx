import { EmptyNoReturnFn } from '@common/utils';
import { Button, Box, Flex, Textarea, Collapse } from '@chakra-ui/react';
import { PostHeaderAvatar } from '@common/components/PostCard/PostHeader/PostHeaderAvatar';
// import useUser from '@common/hooks/useUser';

interface PostFormProps {
  isOpen: boolean;
  onToggle: EmptyNoReturnFn;
  getCroppedImage: EmptyNoReturnFn;
}

export const PostForm = ({ isOpen, onToggle, getCroppedImage }: PostFormProps) => {
  // const { user } = useUser();
  return (
    <Box>
      <Collapse in={isOpen}>
        <Box
          p='6'
          color='white'
          w={['100%', '80%', '60%']}
          maxH={'100%'}
          bg='teal.500'
          zIndex={100}
          // width={'100%'}
          rounded='md'
          shadow='md'
          position='absolute'
          right='0'
          top='3.5rem'
        >
          {/* {user && <PostHeaderAvatar username={user.username} avatarUrl={user.avatarUrl} />} */}
          <Textarea
            placeholder='Add a caption, with some #hashtags to get noticed!'
            size='lg'
            resize='none'
            minH='10rem'
            bg='transparent'
            color='white'
            _placeholder={{ color: 'white' }}
            mt='4'
          />
          <Flex justifyContent={'flex-end'} w='100%' p='3' alignSelf={'flex-end'}>
            <Button variant='solid' colorScheme='telegram' size={['md', 'md', 'md']} onClick={getCroppedImage}>
              Post
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
