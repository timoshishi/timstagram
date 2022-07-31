import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cropper } from '../../common/components/ImageUploader/Cropper';
import { noOp } from '../../common/utils';
import { Button, Modal, ModalContent } from '@chakra-ui/react';

export default {
  title: 'Components/Cropper',
  component: Cropper,
  centered: true,
  argTypes: {
    cropShape: {
      control: {
        type: 'radio',
        options: ['rect', 'round'],
      },
    },
  },
} as ComponentMeta<typeof Cropper>;
const URL =
  'https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000';

const Template: ComponentStory<typeof Cropper> = (args) => {
  const [preview, setPreview] = React.useState<string>(URL);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const clearFile = () => {
    if (preview) {
      setPreview('');
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setPreview(URL);
    }
  };
  if (!isOpen) {
    return <Button onClick={clearFile}>Open</Button>;
  }
  return (
    <Modal isOpen={isOpen} size='full' onClose={noOp}>
      <ModalContent>
        <Cropper
          previewUrl={preview}
          handleCroppedImage={(img) => {
            console.log(img);
            return null;
          }}
          clearFile={clearFile}
          cropShape={args.cropShape}
        />
      </ModalContent>
    </Modal>
  );
};

export const Primary = Template.bind({});
