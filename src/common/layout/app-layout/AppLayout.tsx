import { Container, VStack } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ReactElement } from 'react-markdown/lib/react-markdown';

export const AppLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Navbar />
    <Container as='main' minH='100vh' position='relative' mt='0' minW='full' maxW='100vw' centerContent p={0}>
      <VStack spacing={0} width={['100%', '100%', '80%', '60%']}>
        {children}
      </VStack>
    </Container>
    <Footer />
  </>
);

export const getAppLayout = (page: any) => <AppLayout>{page}</AppLayout>;
