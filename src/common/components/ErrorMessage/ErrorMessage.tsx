import { Text, Box } from '@chakra-ui/react';

export const ErrorMessage = ({ errorMessage, ...props }: { errorMessage: string | undefined | null }) => (
  <>
    {errorMessage ? (
      <Box p={2}>
        <Text fontSize='sm' color='red.500' {...props}>
          {errorMessage}
        </Text>
      </Box>
    ) : null}
  </>
);
