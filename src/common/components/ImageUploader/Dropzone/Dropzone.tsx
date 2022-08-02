import { useDropzone } from 'react-dropzone';
import { OnDrop, onDrop } from '../imageUploader.functions';
import { useCallback } from 'react';
import {
  Center,
  useColorModeValue,
  Icon,
  Flex,
  VStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { MdCloudUpload } from 'react-icons/md';

const ACCEPTED_FILE_TYPES = {
  'image/*': [],
};

interface DropzoneProps {
  onDrop: OnDrop;
}
export const Dropzone = ({
  isDragActive,
  getRootProps,
  getInputProps,
}: {
  isDragActive: boolean;
  getRootProps: any;
  getInputProps: any;
}) => {
  // const onDrop: OnDrop = useCallback((acceptedFiles) => {
  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onabort = () => console.log('file reading was aborted');
  //     reader.onerror = () => console.log('file reading has failed');
  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result;
  //       console.log(binaryStr);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // }, []);

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
  const borderColor = useColorModeValue(
    isDragActive ? 'teal.300' : 'blue.300',
    isDragActive ? 'teal.500' : 'blue.500'
  );

  return (
    <Flex alignItems={'center'} justifyContent='center' flexDir='column'>
      <Center
        p={10}
        cursor='pointer'
        bg={isDragActive ? activeBg : 'transparent'}
        _hover={{ bg: activeBg }}
        transition='background-color 0.2s ease'
        borderRadius={8}
        border={border}
        borderColor={borderColor}
        {...getRootProps()}>
        <VStack>
          <Icon as={MdCloudUpload} w={60} h={60} color='blue.500' />
          <input {...getInputProps()} />
          <Text fontSize='lg'>{dropText}</Text>
        </VStack>
      </Center>
    </Flex>
  );
};
