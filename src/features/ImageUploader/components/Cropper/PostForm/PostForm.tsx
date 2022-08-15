import { EmptyNoReturnFn } from '@common/utils';
import { useState } from 'react';
import { Button, Box, Flex, Textarea, Collapse } from '@chakra-ui/react';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { GetCroppedImage, GetCroppedImageReturn } from '@features/ImageUploader/types/image-uploader.types';
import { createPost } from '@features/ImageUploader/api/createPost';
import { HandleSubmitPost, useCreatePostModal } from '@features/Modal/hooks/useCreatePostModal';
import { useImageUploaderContext } from '@features/ImageUploader/hooks/useImageUploaderContext';

interface PostFormProps {
  // isOpen: boolean;
  // handleSubmit: HandleSubmitPost;
  // handleCancel: EmptyNoReturnFn;
}

export const PostForm = ({}: PostFormProps) => {
  const { croppedImage: croppedImageData, clearFile } = useImageUploaderContext();
  const {
    componentProps: { handleSubmit },
  } = useCreatePostModal();
  const [caption, setCaption] = useState('');
  const handleCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };
  return (
    <Box>
      <Collapse in={!!croppedImageData}>
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
            <Button variant='outline' colorScheme='telegram' size={['md', 'md', 'md']} onClick={clearFile}>
              Cancel
            </Button>
            <Button
              variant='solid'
              colorScheme='telegram'
              size={['md', 'md', 'md']}
              onClick={() => {
                handleSubmit({ caption, croppedImageData });
              }}
            >
              Post
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
