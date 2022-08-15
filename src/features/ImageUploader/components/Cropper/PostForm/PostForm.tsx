import { EmptyNoReturnFn } from '@common/utils';
import { useState } from 'react';
import { Button, Box, Flex, Textarea, Collapse } from '@chakra-ui/react';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { GetCroppedImage } from '@features/ImageUploader/types/image-uploader.types';
import { createPost } from '@features/ImageUploader/api/createPost';

interface PostFormProps {
  isOpen: boolean;
  onToggle: EmptyNoReturnFn;
  getCroppedImage: GetCroppedImage;
}

export const PostForm = ({ isOpen, onToggle, getCroppedImage }: PostFormProps) => {
  const [caption, setCaption] = useState('');
  const handleCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const submitPost = async () => {
    const croppedImageData = await getCroppedImage();
    if (!croppedImageData) return;
    await createPost({ caption, ...croppedImageData });
  };

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
            value={caption}
            onChange={handleCaption}
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
            <Button variant='solid' colorScheme='telegram' size={['md', 'md', 'md']} onClick={submitPost}>
              Post
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
