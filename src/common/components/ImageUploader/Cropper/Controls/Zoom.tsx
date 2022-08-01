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
  const [isPopoverOpen, { on, off }] = useBoolean(false);
  return (
    <Popover
      trigger='hover'
      placement='top-start'
      isLazy={true}
      onOpen={on}
      closeDelay={300}
      openDelay={100}
      onClose={off}>
      <PopoverTrigger>
        <Box h={10} w={10}>
          <ScaleFade initialScale={0.4} in={!isPopoverOpen}>
            <IconButton
              aria-label='zoom in'
              bg='rgba(0,0,0,0)'
              color='white'
              as={FiZoomIn}
              h='8'
              w='8'
              size='sm'
              _hover={{
                cursor: 'pointer',
              }}
            />
          </ScaleFade>
        </Box>
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
