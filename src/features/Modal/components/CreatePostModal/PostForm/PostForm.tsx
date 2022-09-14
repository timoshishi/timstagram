import { useState } from 'react';
import { Button, Box, Textarea, Collapse, Stack } from '@chakra-ui/react';
import { useCreatePostModal } from '@features/Modal/hooks/useCreatePostModal';
import { useImageUploader } from '@features/ImageUploader/hooks/useImageUploader';
import { handlePostSubmit } from '@features/Modal/api/post-api';

interface PostFormProps {}

export const PostForm = ({}: PostFormProps) => {
  const {
    croppedImage: croppedImageData,
    clearFile,
    toggleUploaderLoading,
    croppedImage,
    isUploaderLoading,
  } = useImageUploader();
  const { useModalToast } = useCreatePostModal();
  const [caption, setCaption] = useState('');
  console.log({ isUploaderLoading });
  const handleCaption = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaption(e.target.value);
  };

  const onFormSubmit = async () => {
    toggleUploaderLoading();
    try {
      if (croppedImage !== null) {
        await handlePostSubmit({ imageData: croppedImage, caption });
        clearFile();
        useModalToast.success({
          message: 'Post created!',
        });
      }
      setCaption('');
      clearFile();
    } catch (error) {
      useModalToast.error({
        error,
        message: 'We have encountered an error. Please try again later.',
      });
    }
    toggleUploaderLoading();
  };

  return (
    <Box>
      <Collapse in={!!croppedImageData && !isUploaderLoading}>
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
          <Stack spacing={['3']} justifyContent={'flex-end'} w='100%' p='3' alignSelf={'flex-end'}>
            <Button variant='outline' colorScheme='telegram' size={['md', 'md', 'md']} onClick={clearFile}>
              Cancel
            </Button>
            <Button
              variant='solid'
              type='submit'
              colorScheme='telegram'
              size={['md', 'md', 'md']}
              onClick={onFormSubmit}
            >
              Post
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};
