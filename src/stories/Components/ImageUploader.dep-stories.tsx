import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageUploader, ImageUploaderProvider } from '../../features/ImageUploader';
import { rest } from 'msw';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  centered: true,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ImageUploader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageUploader> = (args: unknown) => {
  const props = {
    ...initialValue,
    ...args,
  };
  return (
    <ImageUploaderProvider>
      <ImageUploader />
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
  // preview: {
  //   defaultValue: '',
  //   control: {
  //     labels: {
  //       '': 'No Preview',
  //       '/storybook/aspect-1-1.jpg': '1:1',
  //       '/storybook/aspect-4-3.jpg': '4:3',
  //       '/storybook/aspect-16-9.jpg': '16:9',
  //     },
  //     type: 'radio',
  //   },
  //   options: [
  //     '',
  //     '/storybook/aspect-1-1.jpg',
  //     '/storybook/aspect-4-3.jpg',
  //     '/storybook/aspect-16-9.jpg',
  //   ],
  // },
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
