import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageUploader } from '../../common/components/ImageUploader/ImageUploader';
import * as CropperStories from './Cropper.stories';
import {
  ImageUploaderProvider,
  useCreateUploaderContext,
} from '../../common/components/ImageUploader/ImageUploaderContext';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  centered: true,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ImageUploader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageUploader> = (args: unknown) => {
  const initialValue = useCreateUploaderContext();
  const props = {
    ...initialValue,
    ...args,
  };
  return (
    <ImageUploaderProvider initialValue={props}>
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
  preview: {
    defaultValue: '',
    control: {
      labels: {
        '': 'No Preview',
        '/storybook/aspect-1-1.jpg': '1:1',
        '/storybook/aspect-4-3.jpg': '4:3',
        '/storybook/aspect-16-9.jpg': '16:9',
      },
      type: 'radio',
    },
    options: [
      '',
      '/storybook/aspect-1-1.jpg',
      '/storybook/aspect-4-3.jpg',
      '/storybook/aspect-16-9.jpg',
    ],
  },
};
// };

// More on args: https://storybook.js.org/docs/react/writing-stories/args
