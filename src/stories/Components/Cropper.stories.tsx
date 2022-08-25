import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cropper, ImageUploaderProvider } from '../../features/ImageUploader';
import { noOp } from '../../common/utils';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import { withPerformance } from 'storybook-addon-performance';
import { rest } from 'msw';
export default {
  title: 'Components/Cropper',
  component: Cropper,
  decorators: [withPerformance],
} as ComponentMeta<typeof Cropper>;

const Template: ComponentStory<typeof Cropper> = (args) => {
  // const initialValue = useCreateUploaderContext();
  const props = {
    // ...initialValue,
    // ...args,
  };
  return (
    <ImageUploaderProvider>
      <Modal isOpen={true} onClose={noOp} size={['md', 'lg', '3xl']} initialFocusRef={undefined} isCentered={true}>
        <Cropper />
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

Primary.parameters = {
  msw: [
    // rest.get('/api/auth/user', (req, res, ctx) => {
    //   return res(
    //     ctx.json({
    //       user: {
    //         id: '1',
    //         username: 'Bobby Daniels',
    //         avatarUrl: '',
    //       },
    //     })
    //   );
    // }),
    rest.get('/api/user/:id', (req, res, ctx) => {
      return res(
        ctx.json({
          id: '1',
          username: 'Bennie.Lehner',
          verifiedAt: '2021-11-21T02:50:43.534Z',
          avatarUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/830.jpg',
          createdAt: '2022-06-25T08:09:21.888Z',
          updatedAt: '2021-10-06T01:52:18.215Z',
          banned: true,
          isBot: false,
          email: 'Rafaela.Russel@hotmail.com',
        })
      );
    }),
  ],
};
