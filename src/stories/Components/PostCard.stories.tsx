import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { post } from '../../mocks/post';
import { PostCard } from '../../features/PostFeed';
import type { PostCardProps } from '../../features/PostFeed';
import { Box } from '@chakra-ui/react';
import { supaUser } from '../../mocks/supaUser';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/PostCard',
  component: PostCard,
  // centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof PostCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PostCard> = (args) => (
  <Box w={['100vw']} maxH={['10vw']}>
    <PostCard {...args} />
  </Box>
);

export const NoUser = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const props: PostCardProps = {
  post: post,
  setSize: (size: number) => {
    console.info(size);
  },
  size: 0,
  refreshIdx: 2,
  currentIdx: 1,
  page: 0,
  user: null,
};

NoUser.args = props;

export const WithUser = Template.bind({});

WithUser.args = {
  ...props,
  user: supaUser,
};

// https://kwgfmfvqwtlfbskfksiv.supabase.co/rest/v1/post_likes?post_id=eq.8a184667-6ea8-4ac5-83b9-b22ab633faac&user_id=eq.489418a5-c47f-4287-b4b6-d472d1e7c37e
