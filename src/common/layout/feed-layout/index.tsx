import { VStack } from '@chakra-ui/react';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import { getAppLayout } from '../app-layout';

export const FeedLayout = ({ children }: { children: ReactElement }) => {
  return (
    <VStack bg='orange' w={['100%', '100%', '80%', '80%']} as='section'>
      {children}
    </VStack>
  );
};

export const getFeedLayout = (page: any) =>
  getAppLayout(<FeedLayout>{page}</FeedLayout>);
