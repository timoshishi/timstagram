import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { post } from '../../../__mocks__/fixtures/post';
import { PostCard } from '../../common/components/PostCard';
import type { PostCardProps } from '../../common/components/PostCard';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PostCard',
  component: PostCard,
  // centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PostCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PostCard> = (args) => (
  <PostCard {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const props: PostCardProps = {
  post: post,
  setSize: (size: number) => {
    console.log(size);
  },
  size: 0,
  refreshIdx: 2,
  currentIdx: 1,
  page: 0,
};

Primary.args = props;
