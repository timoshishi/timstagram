import { useState } from 'react';
import { Button, Box, Flex, Textarea, Collapse } from '@chakra-ui/react';
import { useCreatePostModal } from '@features/Modal/hooks/useCreatePostModal';
import { useImageUploaderContext } from '@features/ImageUploader/hooks/useImageUploaderContext';
import { handlePostSubmit } from '@features/Modal/api/profile-api';

interface PostFormProps {}

export const PostForm = ({}: PostFormProps) => {
  const { croppedImage: croppedImageData, clearFile, toggleUploaderLoading, croppedImage } = useImageUploaderContext();
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
          message: 'Avatar updated successfully',
        });
      }
      clearFile();
    } catch (error) {
      useModalToast.error({
        error,
        message: 'Error updating avatar',
      });
    }
    toggleUploaderLoading();
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
            <Button variant='solid' colorScheme='telegram' size={['md', 'md', 'md']} onClick={onFormSubmit}>
              Post
            </Button>
          </Flex>
        </Box>
      </Collapse>
    </Box>
  );
};
