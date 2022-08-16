import { supabase } from 'src/lib/initSupabase';

import { Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { SupaUser } from 'types/index';
import { useProfileModal } from '@features/Modal';
interface ProfileDropdownProps {
  user: SupaUser;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { showProfileModal } = useProfileModal();
  return (
    <>
      <Flex alignItems={'center'}>
        <Menu isLazy>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'}>
            <Avatar size={'sm'} src={user.user_metadata.avatarUrl} name={user.user_metadata.username} />
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={() => {
                showProfileModal({
                  initialProfileData: {
                    username: user.user_metadata.username,
                    avatarUrl: user.user_metadata.avatarUrl,
                    bio: user.user_metadata.bio,
                  },
                });
              }}
            >
              Link 1
            </MenuItem>
            <MenuItem>Link 2</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => supabase.auth.signOut()}>SignOut</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};
