import { useState } from 'react';
import { Button, Box, Textarea, Collapse, Stack } from '@chakra-ui/react';
import { useCreatePostModal } from '../../hooks';
import { useImageUploader } from '@features/ImageUploader';
import { handlePostSubmit } from '../../api/post-api';

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
          w={['100%']}
          maxH={'100%'}
          minH={'80%'}
          zIndex={100}
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
            color='white'
            bg='blackAlpha.600'
            _placeholder={{ color: 'white' }}
          />
          <Stack spacing={['3']} justifyContent={'flex-end'} w='100%' p='3' alignSelf={'flex-end'}>
            <Button
              variant='outline'
              colorScheme='telegram'
              bg='white'
              opacity='0.9'
              size={['md', 'md', 'md']}
              onClick={clearFile}
            >
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
