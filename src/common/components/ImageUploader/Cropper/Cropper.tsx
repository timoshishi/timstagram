import { useState, useCallback } from 'react';
import { Text, Box, Flex, Icon, Button, Center } from '@chakra-ui/react';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from './cropper.functions';
import { FiRotateCw } from 'react-icons/fi';
import { Zoom } from './Zoom';
import { AspectRatio } from './AspectRatio';
import type { HandleCroppedImage } from '../imageUploader.types';

interface CropperProps {
  previewUrl: string;
  handleCroppedImage: HandleCroppedImage;
  clearFile: () => void;
  cropShape: 'round' | 'rect';
}

export const EasyCropper = ({
  previewUrl,
  handleCroppedImage,
  clearFile,
  cropShape = 'rect',
}: CropperProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  // const [croppedImage, setCroppedImage] = useState<File | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        previewUrl,
        croppedAreaPixels,
        rotation
      );
      handleCroppedImage({ croppedImage, croppedAreaPixels, aspectRatio });
      // setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previewUrl, croppedAreaPixels, rotation, aspectRatio]);

  const handleRotate = () => {
    if (rotation < 360) {
      setRotation(rotation + 90);
    } else {
      setRotation(0);
    }
  };

  const onClose = useCallback(() => {
    // setCroppedImage(null);
  }, []);

  return (
    <Flex alignItems={'center'} justifyContent='center' flexDir='column'>
      <Center p={10}>
        <Flex minH='100%' minW='100%' flexDir='column' position='relative'>
          <Box>
            <Cropper
              image={previewUrl}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              style={{
                containerStyle: {
                  maxHeight: '50vh',
                  minHeight: '50vh',
                  position: 'relative',
                },
              }}
              cropShape={cropShape}
              aspect={aspectRatio}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Flex
            alignContent={'center'}
            w='100vw'
            justifyContent={'space-around'}>
            <Box w='50%'>
              <Zoom setZoom={setZoom} />
            </Box>
            <Box>
              <AspectRatio setAspectRatio={setAspectRatio} />
            </Box>
            <Box>
              <Text fontSize='16px'>Rotation</Text>
              <Icon as={FiRotateCw} onClick={handleRotate} w={25} h={25} />
            </Box>
          </Flex>
          <Button onClick={getCroppedImage}>Crop</Button>
          <Button onClick={clearFile}>Clear Image</Button>
        </Flex>
      </Center>
    </Flex>
  );
};
