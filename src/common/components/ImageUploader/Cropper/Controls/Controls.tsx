import React from 'react';
import { Box, Icon, Flex } from '@chakra-ui/react';
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
    <Box
      display='flex'
      flexDir='column'
      alignContent={['space-around']}
      justifyContent={['flex-end']}>
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
              stroke='white'
              fill='none'
              stroke-width='2'
            />
          </Box>
          {cropShape === 'rect' && (
            <Box p='2' pl='0' mt='1'>
              <AspectRatio setAspectRatio={setAspectRatio} />
            </Box>
          )}
        </Flex>
        <Box p='2' mt='1'>
          <Zoom setZoom={setZoom} />
        </Box>
      </Flex>
    </Box>
  );
};
