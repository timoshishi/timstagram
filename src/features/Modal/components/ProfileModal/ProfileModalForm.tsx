import { Box, Flex, ModalCloseButton, AvatarBadge } from '@chakra-ui/react';
import { BrandLogo } from '@src/common/components/BrandLogo';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { ProfileModalProps } from './ProfileModal';
import { EditIcon } from '@chakra-ui/icons';
import { DeleteAccount } from './DeleteAccount';
import { EditBio } from './EditBio';
import { EditAvatar } from './EditAvatar';

interface ProfileModalFormProps {
  initialProfileData: ProfileModalProps['initialProfileData'];
  profile: Required<ProfileModalFormProps['initialProfileData']>;
  deleteUser: () => void;
  getButtonProps: () => any;
  getDisclosureProps: () => any;
  avatarUrl: string;
}
export const ProfileModalForm = ({
  initialProfileData,
  profile,
  getButtonProps,
  getDisclosureProps,
  avatarUrl,
}: ProfileModalFormProps) => {
  return (
    <Box {...getDisclosureProps()}>
      {initialProfileData.username && <ModalCloseButton />}
      <Flex flexDirection='column' gap='4'>
        <Flex alignItems='center' justifyContent='center'>
          <BrandLogo />
        </Flex>
        <EditAvatar initialProfileData={initialProfileData} getButtonProps={getButtonProps} avatarUrl={avatarUrl} />
        <EditBio profile={profile} />
        <DeleteAccount />
      </Flex>
    </Box>
  );
};
