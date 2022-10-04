import { Box, Flex, AvatarBadge, Tooltip } from '@chakra-ui/react';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { EditIcon } from '@chakra-ui/icons';

interface ProfileModalFormProps {
  username: string;
  getButtonProps: () => any;
  avatarUrl: string;
}
export const EditAvatar = ({ username, getButtonProps, avatarUrl }: ProfileModalFormProps) => {
  return (
    <Flex alignItems='center' justifyContent='space-between'>
      <Box flexGrow={1} {...getButtonProps()} data-testid='edit-avatar'>
        <PostHeaderAvatar
          username={username}
          avatarUrl={avatarUrl}
          size='sm'
          badge={
            <AvatarBadge bg='papayawhip' color='black' boxSize='1em' borderRadius='0'>
              <Tooltip label='Edit Avatar' fontSize='md'>
                <EditIcon h={4} w={4} />
              </Tooltip>
            </AvatarBadge>
          }
        />
      </Box>
    </Flex>
  );
};
