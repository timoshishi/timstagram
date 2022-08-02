import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBoolean,
  ScaleFade,
  IconButton,
} from '@chakra-ui/react';
import { FiZoomIn } from 'react-icons/fi';

export interface ZoomProps {
  setZoom: (zoom: number) => void;
}
export const Zoom = ({ setZoom }: ZoomProps) => {
  return (
    <Popover
      trigger='hover'
      placement='top-start'
      isLazy={true}
      closeDelay={300}
      openDelay={100}>
      <PopoverTrigger>
        {/* <Box h={10} w={10}> */}
        <IconButton
          aria-label='zoom in'
          bg='rgba(0,0,0,0)'
          color='white'
          icon={<FiZoomIn size='lg' />}
          _hover={{
            cursor: 'pointer',
          }}
        />
        {/* </Box> */}
      </PopoverTrigger>
      <PopoverContent
        opacity='0'
        backgroundColor='rgba(0,0,0,0) '
        borderWidth='0px'
        py={4}
        px={3}>
        <Slider
          id='slider'
          min={1}
          max={2}
          maxW={'28'}
          py={-1}
          step={0.02}
          defaultValue={1}
          colorScheme='telegram'
          onChange={setZoom}>
          <SliderTrack h='1.5'>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb w={[6]} h={[6]}>
            <Box color='orange.400' as={FiZoomIn} h='6' w='6' />
          </SliderThumb>
        </Slider>
      </PopoverContent>
    </Popover>
  );
};
