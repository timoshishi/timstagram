import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageUploader } from '../../common/components/ImageUploader/ImageUploader';
import * as CropperStories from './Cropper.stories';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/ImageUploader',
  component: ImageUploader,
  centered: true,
  argTypes: {
    cropShape: {
      control: {
        type: 'radio',
        options: ['rect', 'round'],
      },
    },
    title: {
      control: {
        type: 'text',
      },
      defaultValue: 'Upload Image',
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof ImageUploader>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ImageUploader> = (args) => (
  <ImageUploader {...args} />
);

export const Primary = Template.bind({});
Primary.argTypes = {
  testImg: CropperStories.Primary.argTypes?.previewUrl,
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
