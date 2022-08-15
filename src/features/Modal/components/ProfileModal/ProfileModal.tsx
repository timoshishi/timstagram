import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useProfileModal } from '../../hooks/useProfileModal';
import { ProfileModalForm } from './ProfileModalForm';

export interface ProfileModalProps {
  initialProfileData: {
    username?: string;
    description?: string;
    avatarUrl?: string;
    userId: string;
    email: string;
  };
}

export const ProfileModal = () => {
  const {
    componentProps: { initialProfileData },
  } = useProfileModal();

  const profile = Object.assign(
    {
      username: '',
      description: '',
      avatarUrl: '',
    },
    initialProfileData
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullFormData = new FormData(e.target as HTMLFormElement);

    const dataParsed = Object.fromEntries(fullFormData.entries());
    e.preventDefault();
  };
  const deleteUser = async () => {
    const { data, error } = await supabaseClient.from('profiles').delete().match({ userId: initialProfileData.userId });
    const { data: data2, error: error2 } = await supabaseClient
      .from('auth.users')
      .delete()
      .match({ id: initialProfileData.userId });
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent p={6}>
        <ProfileModalForm
          profile={profile}
          initialProfileData={initialProfileData}
          handleSubmit={handleSubmit}
          deleteUser={deleteUser}
        />
      </ModalContent>
    </>
  );
};
