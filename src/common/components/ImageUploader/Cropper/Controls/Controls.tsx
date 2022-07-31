import React from 'react';
import { Box, Text, Icon, Flex, Center } from '@chakra-ui/react';
import { Zoom } from './Zoom';
import { AspectRatio } from './AspectRatio';
import { FiRotateCw } from 'react-icons/fi';

interface ControlsProps {
  setZoom: (zoom: number) => void;
  handleRotate: () => void;
  setAspectRatio: (aspectRatio: number) => void;
  cropShape: 'rect' | 'round';
}

export const Controls = ({
  setZoom,
  handleRotate,
  setAspectRatio,
  cropShape,
  ...props
}: ControlsProps) => {
  return (
    <Flex
      alignContent={'center'}
      w='100%'
      justifyContent={'space-around'}
      px='4'
      mt='4'
      flexDir={['column', 'column', 'row-reverse']}
      {...props}>
      <Flex
        gap={4}
        alignContent='center'
        justifyContent={['flex-end', 'flex-end', 'space-between']}>
        <Box
          p='2'
          mt='1'
          _hover={{
            cursor: 'pointer',
          }}>
          <Icon
            as={FiRotateCw}
            onClick={handleRotate}
            w={[6, 8]}
            h={[6, 8]}
            fill='whiteAlpha.200'
            stroke='blackAlpha.500'
          />
        </Box>
        {cropShape === 'rect' && (
          <Box p='2'>
            <AspectRatio setAspectRatio={setAspectRatio} />
          </Box>
        )}
      </Flex>
      <Box flexGrow={1} px='4' py='2'>
        <Zoom setZoom={setZoom} />
      </Box>
    </Flex>
  );
};
