import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dropzone } from '../../common/components/ImageUploader/Dropzone';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Dropzone',
  component: Dropzone,
  centered: true,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Dropzone>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Dropzone> = (args) => <Dropzone />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args

Primary.args = {
  onFileAccepted: (file) => {
    console.log(file, 'FILE');
  },
};
