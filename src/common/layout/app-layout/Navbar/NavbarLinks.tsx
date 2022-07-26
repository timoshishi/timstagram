import { useState } from 'react';
import {
  BoxProps,
  FlexProps,
  Icon,
  Flex,
  Link,
  Show,
  useMediaQuery,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Search } from './Search/Search';
interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
];

export const NavbarLinks = (props: BoxProps) => {
  const isBelowTabletSize = useMediaQuery('(max-width: 768px)')[0];
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  return (
    <Flex flexShrink={1}>
      <Search isFocused={isSearchFocused} setIsFocused={setIsSearchFocused} />
      {isSearchFocused && isBelowTabletSize ? null : (
        <>
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} name={link.name} />
          ))}
        </>
      )}
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  name: string;
}
export const NavItem = ({ icon, name, ...rest }: NavItemProps) => {
  return (
    <Link
      href='#'
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <NavbarIcon icon={icon} name={name} />
    </Link>
  );
};
export const NavbarIcon = ({ icon, name, ...rest }: NavItemProps) => {
  return (
    <Flex
      align='center'
      p={[0, 4, 5]}
      borderRadius='sm'
      role='group'
      cursor='pointer'
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}>
      {icon && (
        <Icon
          mx={[2]}
          fontSize='16'
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      <Show above='md'>{name}</Show>
    </Flex>
  );
};
