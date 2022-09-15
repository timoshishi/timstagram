import { Box, Flex, ModalCloseButton } from '@chakra-ui/react';
import { BrandLogo } from '@src/common/components/BrandLogo';
import type { ProfileModalProps } from './ProfileModalBase';
import { DeleteAccount } from './DeleteAccount';
import { EditBio } from './EditBio';
import { EditAvatar } from './EditAvatar';

interface ProfileModalFormProps {
  initialProfileData: ProfileModalProps['initialProfileData'];
  profile: Required<ProfileModalFormProps['initialProfileData']>;
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