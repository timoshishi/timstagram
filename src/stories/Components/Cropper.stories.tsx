import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cropper } from '../../common/components/ImageUploader/Cropper';
import { noOp } from '../../common/utils';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
// import imageFile from './static/658-400x500.jpg';
const ASPECT_1 = 'https://picsum.photos/400/400';
const ASPECT_4_3 = 'https://picsum.photos/400/300';
const ASPECT_16_9 = 'https://picsum.photos/533/300';

export default {
  title: 'Components/Cropper',
  component: Cropper,
  argTypes: {
    cropShape: {
      control: {
        type: 'radio',
        options: ['rect', 'round'],
      },
      previewUrl: {
        control: {
          type: 'radio',
          options: [ASPECT_1, ASPECT_4_3, ASPECT_16_9],
        },
      },
    },
  },
} as ComponentMeta<typeof Cropper>;
const URL =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

export const Primary: ComponentStory<typeof Cropper> = (args) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  return (
    <Modal isOpen={true} onClose={noOp} size={['md', 'md', 'lg']}>
      <ModalOverlay />
      <ModalContent>
        <Cropper
          previewUrl={args.previewUrl}
          // previewUrl={'/storybook/aspect-1-1.jpg'}
          originalDimensions={{ width: 400, height: 400 }}
          handleCroppedImage={(img) => {
            console.log(img);
            return null;
          }}
          clearFile={() => {}}
          cropShape={args.cropShape}
        />
      </ModalContent>
    </Modal>
  );
};

Primary.argTypes = {
  previewUrl: {
    defaultValue: 'https://picsum.photos/1900/1000',

    control: {
      type: 'radio',
      options: [
        '/storybook/aspect-1-1.jpg',
        '/storybook/aspect-4-3.jpg',
        '/storybook/aspect-16-9.jpg',
      ],
    },
  },
};
