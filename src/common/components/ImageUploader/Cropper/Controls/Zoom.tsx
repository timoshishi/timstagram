import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon,
} from '@chakra-ui/react';
import { FiZoomIn } from 'react-icons/fi';

export interface ZoomProps {
  setZoom: (zoom: number) => void;
  zoom: number;
}
export const Zoom = ({ setZoom, zoom }: ZoomProps) => {
  return (
    <Box>
      <Popover
        trigger='hover'
        placement='top-start'
        isOpen={true}
        isLazy={true}
        closeDelay={300}
        openDelay={100}
        gutter={0}>
        <PopoverTrigger>
          <Box
            _hover={{
              cursor: 'pointer',
            }}>
            <Icon
              as={FiZoomIn}
              w={[7, 10]}
              h={[7, 10]}
              stroke='white'
              fill='none'
              strokeWidth='2'
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          opacity={0}
          backgroundColor='rgba(0,0,0,0) '
          borderWidth='0px'
          w={['6rem', '8rem']}
          h={['2rem']}
          p={0}
          pl={[1, 0]}>
          <Slider
            id='slider'
            min={1}
            max={2}
            step={0.02}
            defaultValue={1}
            colorScheme='telegram'
            onChange={setZoom}
            value={zoom}>
            <SliderTrack h='1.5'>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb w={[6]} h={[6]}>
              <Box color='orange.400' as={FiZoomIn} h={6} w={6} />
            </SliderThumb>
          </Slider>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
