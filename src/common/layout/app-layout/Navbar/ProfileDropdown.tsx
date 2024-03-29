import { supabase } from 'src/lib/initSupabase';
import { Flex, Avatar, Button, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react';
import { SupaUser } from 'types/index';
import { useProfileModal } from '@features/ProfileModal';
import { FiLogOut, FiUser } from 'react-icons/fi';
interface ProfileDropdownProps {
  user: SupaUser;
}

export const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { showProfileModal } = useProfileModal();
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Flex alignItems={'center'}>
        <Menu isLazy>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            data-testid='profile-dropdown-button'
          >
            <Avatar
              size={'sm'}
              src={user.user_metadata.avatarUrl}
              name={user.user_metadata.username}
              role='user-avatar'
              data-testid='user-avatar'
            />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={showProfileModal} icon={<FiUser size={16} />}>
              Update Profile
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<FiLogOut />} onClick={handleSignOut}>
              Sign out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};
