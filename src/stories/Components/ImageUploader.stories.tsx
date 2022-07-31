import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ImageUploader } from '../../common/components/ImageUploader/ImageUploader';
import { noOp } from '../../common/utils';
import { Modal } from '@chakra-ui/react';
import * as CropperStories from './Cropper.stories';

const ASPECT_1 = 'https://picsum.photos/400/400';
const ASPECT_4_5 = 'https://picsum.photos/400/500';
const ASPECT_16_9 = 'https://picsum.photos/533/300';
const ASPECT_19_10 = 'https://picsum.photos/573/300';
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
