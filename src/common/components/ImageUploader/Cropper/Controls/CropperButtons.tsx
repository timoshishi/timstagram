import { Flex, Button, useBoolean } from '@chakra-ui/react';
import { EmptyNoReturnFn } from '@common/utils';
import { useDisclosure } from '@chakra-ui/react';
import { useCreateUploaderContext, useImageUploaderContext } from '../../ImageUploaderContext';
import { useImageUploader } from '../../useImageUploader';
import { PostForm } from '../PostForm';
import { RefObject } from 'react';

interface CropperButtonsProps {}
export const CropperButtons = ({}: CropperButtonsProps) => {
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
      <PostForm isOpen={isOpen} onToggle={onToggle} />
    </Flex>
  );
};
