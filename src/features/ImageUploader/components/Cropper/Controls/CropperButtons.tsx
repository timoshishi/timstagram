import { Flex, Button, useDisclosure } from '@chakra-ui/react';
import { GetCroppedImage } from '../../../types/image-uploader.types';
import { useImageUploaderContext } from '../../../hooks/useImageUploaderContext';
import { PostForm } from '../PostForm';

interface CropperButtonsProps {
  getCroppedImage: GetCroppedImage;
}

export const CropperButtons = ({ getCroppedImage }: CropperButtonsProps) => {
  const { clearFile, hasAdditionalStep } = useImageUploaderContext();
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex justifyContent={['space-between', 'space-between', 'flex-end']} w='100%' p='3' alignSelf={'flex-end'}>
      <Button
        variant='outline'
        colorScheme='telegram'
        // onClick={clearFile}
        onClick={clearFile}
        size={['sm', 'sm', 'sm']}
      >
        Cancel
      </Button>
      <Button variant='solid' colorScheme='telegram' size={['sm', 'sm', 'sm']} onClick={getCroppedImage}>
        {hasAdditionalStep ? 'Next' : 'Submit'}
      </Button>
    </Flex>
  );
};
