import { Box, Icon, Flex } from '@chakra-ui/react';
import { Zoom } from './Zoom';
import { AspectRatio } from './AspectRatio';
import { FiRotateCw } from 'react-icons/fi';
import { RefObject } from 'react';

interface ControlsProps {
  setZoom: (zoom: number) => void;
  handleRotate: () => void;
  setAspectRatio: (aspectRatio: number) => void;
  cropShape: 'rect' | 'round';
  zoom: number;
  cropperRef: RefObject<HTMLDivElement | null>;
}

export const Controls = ({
  setZoom,
  zoom,
  handleRotate,
  setAspectRatio,
  cropShape,
  cropperRef,
}: ControlsProps) => {
  return (
    <Flex
      w='100%'
      mb={[1, 5]}
      gap={[4, 4]}
      mr={[4, 4]}
      h={['4rem']}
      p={6}
      alignItems='center'
      justifyContent={['flex-end', 'flex-end']}>
      <Box>
        <Zoom setZoom={setZoom} zoom={zoom} />
      </Box>
      <Box>
        <Icon
          as={FiRotateCw}
          onClick={handleRotate}
          w={[6, 10]}
          h={[6, 10]}
          stroke='white'
          fill='none'
          strokeWidth='2'
          _hover={{
            cursor: 'pointer',
          }}
          aria-label='rotate image'
        />
      </Box>
      {cropShape === 'rect' && (
        <Box mb={[4.5, 1.2]} w={[8, 10]} h={[8, 10]} pl={[0, 1]}>
          <AspectRatio setAspectRatio={setAspectRatio} />
        </Box>
      )}
    </Flex>
  );
};
