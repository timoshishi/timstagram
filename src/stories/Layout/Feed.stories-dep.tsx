import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { feed } from '../../mocks/feed';
import { FeedLayout } from '../../common/layout/Feed';
import { Container } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

export default {
  title: 'Layout/Feed',
  component: FeedLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FeedLayout>;

export const FeedNoData: ComponentStory<typeof FeedLayout> = (...args) => <FeedLayout></FeedLayout>;
