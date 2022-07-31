import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cropper } from '../../common/components/ImageUploader/Cropper';
import { noOp } from '../../common/utils';
import { Button, Modal, ModalBody, ModalContent } from '@chakra-ui/react';

const ASPECT_1 = 'https://picsum.photos/400/400';

const ASPECT_4_5 = 'https://picsum.photos/400/500';
const ASPECT_16_9 = 'https://picsum.photos/533/300';
const ASPECT_19_10 = 'https://picsum.photos/573/300';
const ASPECT_2_1 = 'https://picsum.photos/600/300';

const image = {
  src: '../assets/ASPECT_1.jpg',
};
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
          options: [
            ASPECT_2_1,
            ASPECT_1,
            ASPECT_4_5,
            ASPECT_16_9,
            ASPECT_19_10,
          ],
        },
      },
    },
  },
} as ComponentMeta<typeof Cropper>;
const URL =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

export const Primary: ComponentStory<typeof Cropper> = (args) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  // if (!isOpen) {
  //   return <Button onClick={clearFile}>Open</Button>;
  // }
  return (
    <Modal isOpen={isOpen} size='sm' onClose={noOp}>
      <ModalContent>
        <Cropper
          previewUrl={args.previewUrl}
          // {...args}
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
    defaultValue: ASPECT_1,
    control: {
      type: 'radio',
      options: [ASPECT_1, ASPECT_4_5, ASPECT_16_9],
    },
  },
};
