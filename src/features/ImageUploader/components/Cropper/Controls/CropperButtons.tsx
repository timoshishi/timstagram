import { Flex, Button, useDisclosure } from '@chakra-ui/react';
import { useImageUploaderContext } from '../../../hooks/useImageUploaderContext';
import { PostForm } from '../PostForm';

interface CropperButtonsProps {
  getCroppedImage: () => void;
}

export const CropperButtons = ({ getCroppedImage }: CropperButtonsProps) => {
  const { clearFile } = useImageUploaderContext();
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
      <Button variant='solid' colorScheme='telegram' size={['sm', 'sm', 'sm']} onClick={onToggle}>
        {isOpen ? 'Back' : 'Next'}
      </Button>
      <PostForm isOpen={isOpen} onToggle={onToggle} getCroppedImage={getCroppedImage} />
    </Flex>
  );
};
