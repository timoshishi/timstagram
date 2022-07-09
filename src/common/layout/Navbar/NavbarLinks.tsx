import { ReactNode } from 'react';
import { Flex, Link, useColorModeValue } from '@chakra-ui/react';
import Image, { ImageProps } from 'next/image';

export const NavbarLinks = () => {
  return (
    <Flex
      h={16}
      alignItems={'center'}
      justifyContent={'space-between'}
      gap='6px'>
      <NavbarIcon src='/images/fire.svg' height={25} width={25} alt='popular' />
      <NavbarIcon
        src='/images/trending.svg'
        height={60}
        width={30}
        alt='popular'
      />
      <NavbarIcon src='/images/star.svg' height={20} width={20} alt='popular' />
      <NavbarIcon
        src='/images/add-post.svg'
        height={20}
        width={20}
        alt='popular'
      />
    </Flex>
  );
};

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export const NavbarIcon = (props: ImageProps) => {
  const { height, width, alt, src } = props;
  return <Image height={height} width={width} alt={alt} src={src} />;
};
