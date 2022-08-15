import {
  ModalContent,
  ModalOverlay,
  Modal,
  Portal,
  ModalCloseButton,
  Box,
  Textarea,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useImageUploaderContext } from '../hooks/useImageUploaderContext';
import { Dropzone } from './Dropzone';
import { Cropper } from './Cropper';
import { noOp } from '@common/utils';

export const ImageUploader = () => {
  const { error, preview } = useImageUploaderContext();

  return <>{preview ? <Cropper /> : <Dropzone />}</>;
};
