import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Navbar } from '../../common/layout/Navbar';
import { Container } from '@chakra-ui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/Navbar',
  component: Navbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = () => (
  <Container as='main' minH={'120vh'}>
    <Navbar />
  </Container>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Navbar',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Navbar',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Navbar',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Navbar',
// };
