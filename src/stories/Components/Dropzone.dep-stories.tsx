import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Dropzone } from '../../features/ImageUploader/components/Dropzone';
import { Modal, ModalContent } from '@chakra-ui/react';
import { useImageUploader } from '../../features/ImageUploader/hooks/useImageUploader';
import { ErrorMessage } from '../../common/components/ErrorMessage';
import { noOp } from '../../common/utils';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Dropzone',
  component: Dropzone,
  centered: true,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Dropzone>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary = (args) => {
  const { getRootProps, getInputProps, isDragActive, preview, error, file, dimensions, aspectRatio, clearFile } =
    useImageUploader();
  console.info(file);
  return (
    <Modal isOpen={true} onClose={noOp} size='full'>
      <Dropzone getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} />
      <ErrorMessage errorMessage={error?.message} />
    </Modal>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
