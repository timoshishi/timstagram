import { useRef, useState, useCallback } from 'react';
import { useDimensions, Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import Cropper, { Area } from 'react-easy-crop';
import { getCroppedImg } from './cropper.functions';
import type { HandleCroppedImage } from '../imageUploader.types';
import { Controls } from './Controls/Controls';
import { useImageUploaderContext } from '../ImageUploaderContext';
import { CropperButtons } from './Controls/CropperButtons';

export interface CropperProps {
  handleCroppedImage: HandleCroppedImage;
}

export const EasyCropper = ({ handleCroppedImage }: CropperProps) => {
  const { preview, clearFile, originalDimensions, cropShape } =
    useImageUploaderContext();

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

  const cropperRef = useRef(null);
  const modalRef = useRef(null);
  const dimensions = useDimensions(modalRef, true);
  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  let minHeight = 400;

  if (dimensions) {
    const { width } = dimensions.borderBox;
    const { width: originalWidth, height: originalHeight } = originalDimensions;
    const aspectRatio = originalWidth / originalHeight;
    const newHeight = width / aspectRatio;
    // minHeight = Math.min(newHeight, height);
    minHeight = newHeight;
  }

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        preview!,
        croppedAreaPixels,
        rotation
      );
      handleCroppedImage({ croppedImage, croppedAreaPixels, aspectRatio });
      // setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, croppedAreaPixels, rotation, aspectRatio]);
  const handleRotate = () => {
    if (rotation < 360) {
      setRotation(rotation + 90);
    } else {
      setRotation(0);
    }
  };
  const controlsPositionOffset = useBreakpointValue({
    base: '1rem',
  });

  const onClose = useCallback(() => {
    // setCroppedImage(null);
  }, []);

  return (
    <Flex
      // minH={['100vh', '50%']}
      maxH='100vh'
      ref={modalRef}
      flexDir='column'
      position='relative'
      bg='whiteAlpha.100'
      justifyContent={['center']}>
      <CropperButtons
        getCroppedImage={getCroppedImage}
        cropperRef={cropperRef}
      />
      <Box position='relative'>
        <Cropper
          image={preview ?? undefined}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          showGrid={false}
          style={{
            containerStyle: {
              width: '100%',
              // minHeight: '60vh',
              // height: 'auto',
              // minHeight: `${minHeight}px`,
              backgroundColor: 'blackAlpha.100',
              position: 'relative',
            },
            mediaStyle: {
              width: '100%',
              height: 'auto',
            },
          }}
          objectFit='auto-cover'
          cropShape={cropShape}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
        />
        <Box position='absolute' bottom='0' right='0' w='100%' ref={cropperRef}>
          <Controls
            setZoom={setZoom}
            zoom={zoom}
            setAspectRatio={setAspectRatio}
            handleRotate={handleRotate}
            cropShape={cropShape}
            cropperRef={cropperRef}
          />
        </Box>
      </Box>
    </Flex>
  );
};
