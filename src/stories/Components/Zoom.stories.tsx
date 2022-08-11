import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Box } from '@chakra-ui/react';
import {
  Zoom,
  ZoomProps,
} from '../../features/components/ImageUploader/Cropper/Controls/Zoom';
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
  <Box h='100vh' w='100vw' position='relative' bg='blackAlpha.400'>
    <Box position='absolute' w='100vw' h='100vh' top='50%' left='50%'>
      <Box>
        <Zoom {...args} />
      </Box>
    </Box>
  </Box>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
const props: ZoomProps = { setZoom: noOp };

Primary.args = props;
