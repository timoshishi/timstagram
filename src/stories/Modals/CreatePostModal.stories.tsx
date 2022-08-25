import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal } from '../../features/Modal';
import { CreatePostModal } from '../../features/Modal';
import { Button } from '@chakra-ui/button';
import { useCreatePostModal } from '../../features/Modal/hooks/useCreatePostModal';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const DEFAULT_IMAGE_PLACEHOLDER =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAPUlEQVQImWNorzHVVGIQZ2BIjFJjSIzUtLbgMbVgjIpQYogPkfr/f//V50uUjBkYtDQZwnIZ+hcYWQQzAABayQ5hzoK+iAAAAABJRU5ErkJggg==';

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
          showPostModal({
            handleSubmit: (val) => {
              console.log(val);
            },
          });
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

export const UploadAndPost = Template.bind({});
UploadAndPost.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(
    () => {
      expect(canvas.getByText(/open modal/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  await userEvent.click(canvas.getByText(/open modal/i));
  await waitFor(() => expect(screen.getByText(/tap here/gi)).toBeInTheDocument());
  await userEvent.click(screen.getByTestId('image-input'));
  const result = await fetch(DEFAULT_IMAGE_PLACEHOLDER);
  const blob = await result.blob();
  const file = new File([blob], 'aspect-1-1.jpg', { type: 'image/jpeg' });
  await userEvent.upload(screen.getByTestId('image-input'), file);
  await waitFor(() => expect(screen.getByText(/next/gi)).toBeInTheDocument(), {
    timeout: 10000,
  });
  await userEvent.click(screen.getByText(/next/gi));
  await waitFor(() =>
    expect(
      screen.getByRole('button', {
        name: /post/i,
      })
    ).toBeInTheDocument()
  );
  const textArea = screen.getByRole('textbox');
  await userEvent.type(textArea, 'Hello World');
  await userEvent.click(screen.getByRole('button', { name: /post/i }));
};

export const OpenImageSelector = Template.bind({});
OpenImageSelector.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(
    () => {
      expect(canvas.getByText(/open modal/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  await userEvent.click(canvas.getByText(/open modal/i));
  await waitFor(() => expect(screen.getByText(/tap here/gi)).toBeInTheDocument());
  await userEvent.click(screen.getByTestId('image-input'));
};
