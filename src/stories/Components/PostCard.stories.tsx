import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PostCard, PostCardProps } from '../../common/components/PostCard';

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
  postId: 'asder-2342',
  viewsCount: 30,
  commentsCount: 23,
  description:
    "This is a long winded #description where I holler at my boy @jenkins we'll keep the length to under 300 characters my #guys.",
  commentsToRender: [
    { username: 'user1', title: 'comment1 is all about this comment' },
    { username: 'user2', title: 'comment2' },
  ],
  isFollowing: false,
  repostsCount: 7,
  likesCount: 24,
  hasLiked: true,
  imageURL: 'https://picsum.photos/id/1/200/300',
  poster: {
    username: 'hungryhungryhippo',
    avatarURL: 'https://avatars3.githubusercontent.com/u/17098180?s=460&v=4',
    followerCount: 23,
    followingCount: 12,
    userDescription: 'I am a user who is in to some super hot stuff',
  },
  tags: ['tag1', 'tag2', 'tag3', 'alongertag'],
  createdAt: '2020-01-01',
};
Primary.args = props;
// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'PostCard',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'PostCard',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'PostCard',
// };
