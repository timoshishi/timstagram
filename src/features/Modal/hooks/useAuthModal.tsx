import { useGlobalModalContext } from './useGlobalModal';
import { AuthModalProps } from '../components/AuthModal';

export const useAuthModal = () => {
  const { showModal, ...authModal } = useGlobalModalContext<AuthModalProps>();

  const showAuthModal = (props: AuthModalProps) => showModal('AuthModal', { ...props }, { size: ['sm', 'md'] });

  return {
    showAuthModal,
    ...authModal,
  } as const;
};
