import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal, useGlobalModalContext, ModalType } from '../../features/Modal/components/GlobalModal';
import { CreatePostModal } from '../../features/Modal';
import type { ShowModalParams } from '../../features/Modal/components/GlobalModal';
import { Button } from '@chakra-ui/button';
import { useCreatePostModal } from '../../features/Modal/hooks/useCreatePostModal';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modals/CreatePostModal',
  component: CreatePostModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = () => {
  const { showPostModal } = useCreatePostModal();

  return (
    <div>
      <Button
        onClick={() => {
          showPostModal({});
        }}
      >
        Open Modal
      </Button>
    </div>
  );
};

const Template: ComponentStory<typeof GlobalModal> = () => {
  return (
    <GlobalModal>
      <ModalComp />
    </GlobalModal>
  );
};

export const Primary = Template.bind({});
