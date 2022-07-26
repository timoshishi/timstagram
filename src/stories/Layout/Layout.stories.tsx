import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Layout } from '../../common/layout/Layout';
import { Container } from '@chakra-ui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/Layout',
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = () => (
  <Layout>this is the layout</Layout>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Layout',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Layout',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Layout',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Layout',
// };
