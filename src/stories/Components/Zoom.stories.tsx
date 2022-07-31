import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { post } from '../../../__mocks__/fixtures/post';
import { Center, Box, Flex } from '@chakra-ui/react';
import {
  Zoom,
  ZoomProps,
} from '../../common/components/ImageUploader/Cropper/Controls/Zoom';
import { noOp } from '../../common/utils';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Zoom',
  component: Zoom,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Zoom>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Zoom> = (args) => (
  <Box h='100vh' w='100vw'>
    <Center>
      <Flex alignItems={'center'} justifyContent='center' w='400px' h='100vh'>
        <Zoom {...args} />
      </Flex>
    </Center>
  </Box>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const props: ZoomProps = { setZoom: noOp };

Primary.args = props;
