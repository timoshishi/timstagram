import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SkeletonPostCard } from '../../features/PostCard';
import { Box } from '@chakra-ui/react';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/SkeletonPostCard',
  component: SkeletonPostCard,
  // centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof SkeletonPostCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SkeletonPostCard> = (args) => (
  <Box w={['100vw']} maxH={['10vw']}>
    <SkeletonPostCard {...args} />
  </Box>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// const props: SkeletonPostCardProps = {
// post: post,
// setSize: (size: number) => {
//   console.info(size);
// },
// size: 0,
// refreshIdx: 2,
// currentIdx: 1,
// page: 0,
// };

// Primary.args = props;
