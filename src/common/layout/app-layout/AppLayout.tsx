import { Container, Box, VStack } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ReactElement } from 'react-markdown/lib/react-markdown';

export const AppLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Navbar />
    <Container
      as='main'
      minH='100vh'
      position='relative'
      bg='red'
      mt='0'
      minW='full'
      centerContent
      p={0}>
      <VStack spacing={0} bg='blue' width={['100%', '100%', '80%', '60%']}>
        {children}
      </VStack>
    </Container>
    <Footer />
  </>
);

export const getAppLayout = (page: any) => <AppLayout>{page}</AppLayout>;
