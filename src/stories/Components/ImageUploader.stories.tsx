import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageUploader, ImageUploaderProvider, useImageUploaderContext } from '../../features/ImageUploader';
import { rest } from 'msw';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const Wrapper = (...args) => {
  return (
    <Modal isOpen={true} onClose={noOp} size='full'>
      <Story {...args} />
    </Modal>
  );
};
export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  centered: true,
  decorators: [
    (Story) => (
      <Modal isOpen={true} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent p='0' display={'flex'} flexDir='column'>
          <ImageUploaderProvider>
            <Story />
          </ImageUploaderProvider>
        </ModalContent>
      </Modal>
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ImageUploader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageUploader> = (args: unknown) => {
  console.log(args);
  const { setPreview } = useImageUploaderContext();
  setPreview(args?.preview || null);
  // const props = {
  //   ...initialValue,
  //   ...args,
  // };
  return <ImageUploader />;
};

export const Primary = Template.bind({});
Primary.argTypes = {
  preview: {
    defaultValue: '',
    control: {
      labels: {
        '': 'No Preview',
        // '/storybook/aspect-1-1.jpg': '1:1',
        // '/storybook/aspect-4-3.jpg': '4:3',
        // '/storybook/aspect-16-9.jpg': '16:9',
        '/storybook/h-lg.png': 'Height larger than width',
        '/storybook/w-lg.png': 'Width larger than height',
        '/storybook/h-sm.png': 'Height smaller than width',
        '/storybook/w-sm.png': 'Width smaller than height',
      },
      type: 'radio',
    },
    options: ['', '/storybook/h-lg.png', '/storybook/w-lg.png', '/storybook/h-sm.png', '/storybook/w-sm.png'],
  },
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
};
Primary.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(
    () => {
      expect(canvas.getByText(/open modal/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  await userEvent.click(canvas.getByText(/open modal/i));
  await waitFor(() => expect(screen.getByText(/tap here/gi)).toBeInTheDocument());
  await userEvent.click(screen.getByTestId('image-input'));
  // const result = await fetch(DEFAULT_IMAGE_PLACEHOLDER);
  // const blob = await result.blob();
  // const file = new File([blob], 'aspect-1-1.jpg', { type: 'image/jpeg' });
  // await userEvent.upload(screen.getByTestId('image-input'), file);
  // await waitFor(() => expect(screen.getByText(/next/gi)).toBeInTheDocument(), {
  //   timeout: 10000,
  // });
  // await userEvent.click(screen.getByText(/next/gi));
  // await waitFor(() =>
  //   expect(
  //     screen.getByRole('button', {
  //       name: /post/i,
  //     })
  //   ).toBeInTheDocument()
  // );
  // const textArea = screen.getByRole('textbox');
  // await userEvent.type(textArea, 'Hello World');
  // await userEvent.click(screen.getByRole('button', { name: /post/i }));
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

// More on args: https://storybook.js.org/docs/react/writing-stories/args
