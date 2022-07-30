import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
  GlobalModal,
  useGlobalModalContext,
} from '../../common/components/Modal/GlobalModal';
import { ViewType } from '../../types/auth.types';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Modal',
  component: GlobalModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = () => {
  // const { handleModal, isOpen, setModalProps } = useModal();4
  const { showModal } = useGlobalModalContext<{ viewType: ViewType }>();
  return (
    <div>
      <button
        onClick={() =>
          showModal('AuthModal', {
            viewType: 'sign_up',
          })
        }>
        Open Modal
      </button>
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
// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Primary.args = {
//   onFileAccepted: (file) => {
//     console.log(file, 'FILE');
//   },
// };
