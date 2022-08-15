import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CropperButtons } from '../../features/ImageUploader/components/Cropper/Controls/CropperButtons';
import { noOp } from '../../common/utils';
import { Modal, ModalOverlay, ModalContent, Portal } from '@chakra-ui/react';
import { ImageUploaderProvider } from '../../features/ImageUploader/stores/ImageUploaderContext';

export default {
  title: 'Components/CropperButtons',
  component: CropperButtons,
} as ComponentMeta<typeof CropperButtons>;
const URL = 'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

const Template: ComponentStory<typeof CropperButtons> = (args) => {
  const props = {
    ...initialValue,
    ...args,
  };
  return (
    <ImageUploaderProvider>
      <Modal isOpen={true} onClose={noOp} size={['md', 'lg', '3xl']} initialFocusRef={undefined} isCentered={true}>
        <ModalOverlay />
        <ModalContent p='0' display={'flex'} flexDir='column' h='60vh'>
          <CropperButtons
            getCroppedImage={() => {
              return {};
            }}
          />
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
    options: ['/storybook/aspect-1-1.jpg', '/storybook/aspect-4-3.jpg', '/storybook/aspect-16-9.jpg'],
  },
};
