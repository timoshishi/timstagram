import { Avatar as ChakraAvatar, AvatarProps as ChakraAvatarProps } from '@chakra-ui/react';
import { createAvatarUrl } from '@common/utils';
import { AvatarSizes } from 'types/index';
import { MouseEvent } from 'react';

interface AvatarProps {
  avatarFilename: string | null | undefined;
  size?: AvatarSizes;
  username: string;
  children?: React.ReactNode;
  chakraAvatarProps?: ChakraAvatarProps;
  cb?: (e: MouseEvent<HTMLSpanElement>, username: string) => void;
}

//TODO: #GH-122
export const Avatar = ({
  avatarFilename,
  size = 'md',
  username,
  children,
  chakraAvatarProps = {},
  cb = (e) => {
    e.stopPropagation();
  },
}: AvatarProps) => {
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
    <ChakraAvatar
      name={username}
      src={avatarUrl}
      size={size}
      ignoreFallback={!!avatarUrl}
      {...chakraAvatarProps}
      onClick={(e) => cb(e, username)}
    >
      {children || <></>}
    </ChakraAvatar>
  );
};
