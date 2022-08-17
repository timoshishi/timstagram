import {
  Center,
  useColorModeValue,
  Icon,
  Flex,
  VStack,
  Text,
  useBreakpointValue,
  ModalCloseButton,
} from '@chakra-ui/react';
import { MdCloudUpload } from 'react-icons/md';
import { useImageUploaderContext } from '../../hooks/useImageUploaderContext';

export const Dropzone = () => {
  const { getRootProps, getInputProps, isDragActive } = useImageUploaderContext();
  const baseText = useBreakpointValue({
    base: 'Tap here to select an image',
    md: 'Drag and drop or click here to select an image',
  });
  const dropText = isDragActive ? 'Drop the files here...' : baseText;

  const border = useBreakpointValue({
    base: '',
    sm: '',
    md: '3px dashed',
    lg: '4px dashed',
    xl: '5px dashed',
  });

  const activeBg = useColorModeValue('gray.100', 'gray.600');
  const borderColor = useColorModeValue(isDragActive ? 'teal.300' : 'blue.300', isDragActive ? 'teal.500' : 'blue.500');

  return (
    <>
      <ModalCloseButton />
      <Flex alignItems={'center'} justifyContent='center' flexDir='column' p={[2, 20]}>
        <Center
          p={[4, 10]}
          cursor='pointer'
          bg={isDragActive ? activeBg : 'transparent'}
          _hover={{ bg: activeBg }}
          transition='background-color 0.2s ease'
          borderRadius={8}
          border={border}
          borderColor={borderColor}
          {...getRootProps()}
        >
          <VStack>
            <Icon as={MdCloudUpload} w={60} h={60} color='blue.500' />
            <input {...getInputProps()} />
            <Text fontSize='lg'>{dropText}</Text>
          </VStack>
        </Center>
      </Flex>
    </>
  );
};
