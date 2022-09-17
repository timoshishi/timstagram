import Image from 'next/image';
import { Box } from '@chakra-ui/react';

export const BrandLogo = () => {
  return (
    <Box mt={2} mr={4} alignSelf='center'>
      <Image src='/images/brand-logo.svg' alt='Logo' width={100} height={35} />
    </Box>
  );
};
