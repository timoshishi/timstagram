import { Container, Box, VStack } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}
export const AppLayout = ({ children }: LayoutProps) => {
  return (
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
};
