import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from '@chakra-ui/react';
import { createAvatarUrl } from '@common/utils';
import { AvatarSizes } from 'types/index';

interface AvatarProps {
  avatarFilename: string | null | undefined;
  size?: AvatarSizes;
  username: string;
  children?: React.ReactNode;
  chakraAvatarProps?: ChakraAvatarProps;
}

//TODO: GH-122
export const Avatar = ({ avatarFilename, size = 'md', username, children, chakraAvatarProps = {} }: AvatarProps) => {
  let avatarUrl: string = '';
  if (avatarFilename) {
    avatarUrl = createAvatarUrl({
      avatarFilename,
      size,
      imageStackDomain: process.env.NEXT_PUBLIC_IMAGE_STACK_DOMAIN!,
      imageStackId: process.env.NEXT_PUBLIC_IMAGE_STACK_ID!,
    });
  }

  return (
    <ChakraAvatar name={username} src={avatarUrl} size={size} ignoreFallback={!!avatarUrl} {...chakraAvatarProps}>
      {children || <></>}
    </ChakraAvatar>
  );
};
