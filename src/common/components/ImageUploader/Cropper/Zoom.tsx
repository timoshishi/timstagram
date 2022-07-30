import React from 'react';
import {
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from '@chakra-ui/react';

interface ZoomProps {
  setZoom: (zoom: number) => void;
}
export const Zoom = ({ setZoom }: ZoomProps) => {
  return (
    <Box w='100%'>
      <Text fontSize='16'>Zoom</Text>
      <Slider
        id='slider'
        min={1}
        max={3}
        step={0.02}
        defaultValue={1}
        colorScheme='teal'
        onChange={setZoom}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};
