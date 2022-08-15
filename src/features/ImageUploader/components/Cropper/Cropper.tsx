import { useRef, useState, useCallback } from 'react';
import { useDimensions, Box, Flex, useBreakpointValue, Portal } from '@chakra-ui/react';
import Cropper, { Area } from 'react-easy-crop';
import { getImageFromPreview } from '../../utils/cropper-functions';
import { handleCroppedImage } from '../../utils/image-uploader-functions';
import { Controls } from './Controls/Controls';
import { useImageUploaderContext } from '../../hooks/useImageUploaderContext';
import { CropperButtons } from './Controls/CropperButtons';
import { GetCroppedImage } from '../../types/image-uploader.types';

export interface CropperProps {}

export const EasyCropper = ({}: CropperProps) => {
  const { preview, originalDimensions, cropShape, file, setCroppedImage, shape } = useImageUploaderContext();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    width: originalDimensions.width,
    height: originalDimensions.height,
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
    minHeight = newHeight;
  }

  const getCroppedImage: GetCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getImageFromPreview({ imageSrc: preview!, pixelCrop: croppedAreaPixels, rotation });
      const croppedImageData = await handleCroppedImage({
        croppedImage,
        croppedAreaPixels,
        aspectRatio,
        originalImageName: file!.name,
      });
      console.log('getCroppedImage');
      setCroppedImage(croppedImageData);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, croppedAreaPixels, rotation, aspectRatio, file]);

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

  return (
    <Flex
      // minH={['100vh', '50%']}
      maxH='100vh'
      flexDir='column'
      position='relative'
      bg='whiteAlpha.100'
      justifyContent={['center']}
    >
      <CropperButtons getCroppedImage={getCroppedImage} />
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
              backgroundColor: 'blackAlpha.100',
              position: 'relative',
            },
            mediaStyle: {
              width: '100%',
              height: 'auto',
            },
          }}
          objectFit='auto-cover'
          cropShape={shape || cropShape}
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
