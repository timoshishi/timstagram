import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { feed } from '../../mocks/feed';
import { FeedLayout } from '../../common/layout/Feed';
import { Container } from '@chakra-ui/react';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/Feed',
  component: FeedLayout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FeedLayout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FeedLayout> = (...args) => <FeedLayout {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Layout',
};

Primary.argTypes = {
  feedResponse: {
    defaultValue: undefined,
    control: {
      type: 'radio',
    },
    options: [undefined, 'feed'],
  },
};
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
