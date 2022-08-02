import { Flex, Button } from '@chakra-ui/react';
import { EmptyNoReturnFn } from '@common/utils';

interface CropperButtonsProps {
  clearFile: EmptyNoReturnFn;
  getCroppedImage: EmptyNoReturnFn;
}
export const CropperButtons = ({
  clearFile,
  getCroppedImage,
}: CropperButtonsProps) => {
  return (
    <Flex
      justifyContent={['space-between', 'space-between', 'flex-end']}
      w='100%'
      p='3'
      alignSelf={'flex-end'}>
      <Button
        variant='outline'
        colorScheme='telegram'
        onClick={clearFile}
        size={['sm', 'sm', 'sm']}>
        Cancel
      </Button>
      <Button
        variant='solid'
        colorScheme='telegram'
        size={['sm', 'sm', 'sm']}
        onClick={getCroppedImage}>
        Next
      </Button>
    </Flex>
  );
};
