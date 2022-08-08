import { EmptyNoReturnFn } from '@common/utils';
import {
  useBoolean,
  Button,
  Slide,
  Text,
  Box,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { RefObject } from 'react';

interface PostFormProps {
  togglePostForm: EmptyNoReturnFn;
  isPostFormOpen: boolean;
}

export const PostForm = ({
  cropperRef,
}: {
  cropperRef: RefObject<HTMLElement | null>;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box>
      <Button
        variant='solid'
        colorScheme='telegram'
        size={['sm', 'sm', 'sm']}
        onClick={onOpen}>
        Next
      </Button>
      <Drawer
        placement='right'
        isOpen={isOpen}
        onClose={onClose}
        // zIndex={100}
        portalProps={{
          appendToParentPortal: false,
          containerRef: cropperRef,
        }}>
        <DrawerContent>
          <Box
            p='40px'
            color='white'
            mt='4'
            bg='teal.500'
            zIndex={100}
            rounded='md'
            shadow='md'
            position='absolute'>
            <Text fontSize='2'>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
              iure possimus tempora harum temporibus mollitia veritatis,
              accusamus commodi explicabo necessitatibus placeat ad ipsam,
              consequatur quidem ducimus vel magni. Nostrum, porro.
            </Text>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
