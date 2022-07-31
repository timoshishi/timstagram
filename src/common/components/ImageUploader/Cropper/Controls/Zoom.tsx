import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';
import { FiZoomIn } from 'react-icons/fi';

export interface ZoomProps {
  setZoom: (zoom: number) => void;
}
export const Zoom = ({ setZoom }: ZoomProps) => {
  return (
    <Slider
      id='slider'
      min={1}
      max={3}
      step={0.02}
      defaultValue={1}
      colorScheme='telegram'
      bg='whiteAlpha.300'
      onChange={setZoom}>
      <SliderTrack h='1.5'>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb w={[8]} h={[8]}>
        <Box color='green.400' as={FiZoomIn} />
      </SliderThumb>
    </Slider>
  );
};
