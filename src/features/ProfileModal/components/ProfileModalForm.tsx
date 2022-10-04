import { Box, Flex, ModalCloseButton } from '@chakra-ui/react';
import { BrandLogo } from '@src/common/components/BrandLogo';
import { DeleteAccount } from './DeleteAccount';
import { EditBio } from './EditBio';
import { EditAvatar } from './EditAvatar';
import { SupaUserMetadata } from 'types/index';

interface ProfileModalFormProps {
  userMeta: SupaUserMetadata;
  getButtonProps: () => any;
  getDisclosureProps: () => any;
}

export const ProfileModalForm = ({ userMeta, getButtonProps, getDisclosureProps }: ProfileModalFormProps) => {
  return (
    <Box {...getDisclosureProps()}>
      <ModalCloseButton />
      <Flex flexDirection='column' gap='4'>
        <Flex alignItems='center' justifyContent='center'>
          <BrandLogo />
        </Flex>
        <EditAvatar username={userMeta.username} getButtonProps={getButtonProps} avatarUrl={userMeta.avatarUrl} />
        <EditBio userMeta={userMeta} />
        <DeleteAccount />
      </Flex>
    </Box>
  );
};
