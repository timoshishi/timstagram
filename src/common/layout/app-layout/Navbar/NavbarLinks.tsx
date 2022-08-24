import { useCallback, useState } from 'react';
import { FlexProps, Icon, Flex, Link, Show, useMediaQuery, IconProps } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar } from 'react-icons/fi';
import { AiOutlineForm } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { Search } from './Search/Search';
import { useAuthModal, useCreatePostModal } from '@features/Modal';
import { SupaUser } from 'types/index';

interface LinkItemProps {
  name: string;
  icon: IconType;
  onClick?: () => void;
  rest?: IconProps;
  href?: string;
}

interface NavbarLinksProps {
  user: SupaUser | null;
}

export const NavbarLinks = ({ user }: NavbarLinksProps) => {
  const { showAuthModal } = useAuthModal();
  const { showPostModal } = useCreatePostModal();
  const handlePost = useCallback(() => {
    if (!user) {
      showAuthModal({ viewType: 'sign_up', signUpActionType: 'POST' });
    } else {
      showPostModal();
    }
  }, [user]);

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
    { name: 'Favorites', icon: FiStar },
    { name: 'Post', icon: AiOutlineForm, onClick: handlePost },
  ];

  const isBelowTabletSize = useMediaQuery('(max-width: 768px)')[0];
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <Flex flexShrink={1}>
      <Search isFocused={isSearchFocused} setIsFocused={setIsSearchFocused} />
      {isSearchFocused && isBelowTabletSize ? null : (
        <>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} name={link.name} onClick={link.onClick} />
          ))}
        </>
      )}
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
  onClick?: () => void;
}
export const NavItem = ({ icon, name, onClick, ...rest }: NavItemProps) => {
  return (
    <Link
      // href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
      _hover={{
        boxShadow: 'none',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
      }}
      onClick={onClick}
      data-testid={`${name}-link`}
    >
      <NavbarIcon icon={icon} name={name} {...rest} />
    </Link>
  );
};
export const NavbarIcon = ({ icon, name }: NavItemProps) => {
  return (
    <Flex
      align='center'
      p={[0, 4, 5]}
      borderRadius='sm'
      role='group'
      cursor='pointer'
      _hover={{
        color: 'black',
      }}
    >
      {icon && (
        <Icon
          mx={[2]}
          fontSize='16'
          _groupHover={{
            color: 'black',
          }}
          as={icon}
        />
      )}
      <Show above='md'>{name}</Show>
    </Flex>
  );
};
