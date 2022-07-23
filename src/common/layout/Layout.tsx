import { Container, Box } from '@chakra-ui/react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container as='main' minH={'100vh'} position='relative' mt='80px'>
        {children}
      </Container>
      <Footer />
    </>
  );
};
