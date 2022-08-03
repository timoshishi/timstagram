import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cropper } from '../../common/components/ImageUploader/Cropper';
import { noOp } from '../../common/utils';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import {
  ImageUploaderProvider,
  useCreateUploaderContext,
} from '../../common/components/ImageUploader/ImageUploaderContext';

export default {
  title: 'Components/Cropper',
  component: Cropper,
} as ComponentMeta<typeof Cropper>;
const URL =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

const Template: ComponentStory<typeof Cropper> = (args) => {
  const initialValue = useCreateUploaderContext();
  const props = {
    ...initialValue,
    ...args,
  };
  return (
    <ImageUploaderProvider initialValue={props}>
      <Modal
        isOpen={true}
        onClose={noOp}
        size={['md', 'lg', '3xl']}
        initialFocusRef={undefined}
        isCentered={true}>
        <ModalOverlay />
        <ModalContent p='0' display={'flex'} flexDir='column'>
          <Cropper handleCroppedImage={console.log} />
        </ModalContent>
      </Modal>
    </ImageUploaderProvider>
  );
};

export const Primary = Template.bind({});
Primary.argTypes = {
  cropShape: {
    control: {
      type: 'radio',
      labels: { rect: 'Rectangle', round: 'Round' },
    },
    options: ['rect', 'round'],
  },
  title: {
    type: 'text',
    defaultValue: 'Upload Image',
  },
  preview: {
    defaultValue: '/storybook/aspect-1-1.jpg',
    control: {
      labels: {
        '/storybook/aspect-1-1.jpg': '1:1',
        '/storybook/aspect-4-3.jpg': '4:3',
        '/storybook/aspect-16-9.jpg': '16:9',
      },
      type: 'radio',
    },
    options: [
      '/storybook/aspect-1-1.jpg',
      '/storybook/aspect-4-3.jpg',
      '/storybook/aspect-16-9.jpg',
    ],
  },
};
