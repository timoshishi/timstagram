import { Link } from '@chakra-ui/react';

interface UserLinkProps {
  username: string;
}

export const UserLink = ({ username }: UserLinkProps) => (
  <Link
    fontSize='m'
    fontWeight='semibold'
    as='h4'
    lineHeight='tight'
    alignSelf={'flex-end'}
    onClick={() => console.info('go to user page')}
  >
    @{username}
  </Link>
);
