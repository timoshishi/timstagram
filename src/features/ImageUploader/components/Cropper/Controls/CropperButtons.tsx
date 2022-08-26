import { Stack, Button } from '@chakra-ui/react';
import { GetCroppedImage } from '../../../types/image-uploader.types';
import { useImageUploader } from '../../../hooks/useImageUploader';

interface CropperButtonsProps {
  getCroppedImage: GetCroppedImage;
}

export const CropperButtons = ({ getCroppedImage }: CropperButtonsProps) => {
  const { clearFile, hasAdditionalStep } = useImageUploader();

  return (
    <Stack
      justifyContent={['space-between', 'space-between', 'flex-end']}
      w='100%'
      p={['3']}
      alignSelf={'flex-end'}
      direction='row'
      spacing={[3, 3, 4]}
    >
      <Button variant='outline' colorScheme='telegram' onClick={clearFile} size={['sm', 'sm', 'md']}>
        Back
      </Button>
      <Button variant='solid' colorScheme='telegram' size={['sm', 'sm', 'md']} onClick={getCroppedImage}>
        {hasAdditionalStep ? 'Next' : 'Submit'}
      </Button>
    </Stack>
  );
};
