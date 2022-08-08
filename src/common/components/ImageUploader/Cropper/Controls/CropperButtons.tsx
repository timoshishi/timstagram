import { Flex, Button, useBoolean } from '@chakra-ui/react';
import { EmptyNoReturnFn } from '@common/utils';
import {
  useCreateUploaderContext,
  useImageUploaderContext,
} from '../../ImageUploaderContext';
import { useImageUploader } from '../../useImageUploader';
import { PostForm } from '../PostForm';
import { RefObject } from 'react';

interface CropperButtonsProps {
  getCroppedImage: EmptyNoReturnFn;
  cropperRef: RefObject<HTMLDivElement | null>;
}
export const CropperButtons = ({
  getCroppedImage,
  cropperRef,
}: CropperButtonsProps) => {
  const { clearFile } = useImageUploaderContext();

  return (
    <Flex
      justifyContent={['space-between', 'space-between', 'flex-end']}
      w='100%'
      p='3'
      alignSelf={'flex-end'}>
      <Button
        variant='outline'
        colorScheme='telegram'
        // onClick={clearFile}
        onClick={clearFile}
        size={['sm', 'sm', 'sm']}>
        Cancel
      </Button>
      {/* <PostForm /> */}
      <PostForm cropperRef={cropperRef} />
    </Flex>
  );
};
