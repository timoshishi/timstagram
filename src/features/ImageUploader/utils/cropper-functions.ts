import { Area } from 'react-easy-crop';

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    // image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

type GetImageFromPreviewParams = {
  imageSrc: string;
  pixelCrop: Area;
  rotation: number;
  flip?: {
    horizontal: boolean;
    vertical: boolean;
  };
  shape: 'rect' | 'round';
};

type GetImageFromPreview = (params: GetImageFromPreviewParams) => Promise<File>;

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export const getImageFromPreview: GetImageFromPreview = async ({
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false },
  shape = 'rect',
}) => {
  const image: HTMLImageElement = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return Promise.reject(null);
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const halfSize = pixelCrop.width / 2;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);
  if (shape === 'round') {
    let { width, height } = image;
    ctx.globalCompositeOperation = 'destination-in';
    ctx.arc(halfSize, halfSize, halfSize, 0, 2 * Math.PI);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(canvas, 0, 0, width, height);
    ctx.globalCompositeOperation = 'destination-in';
    ctx.beginPath();
    ctx.arc(halfSize, halfSize, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    ctx.fill();
  }
  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'cropped', {
          type: 'image/png',
        });
        resolve(file);
        // console.info({ doneFile });
        // resolve(URL.createObjectURL(blob));
      } else {
        reject(new Error('Canvas is empty'));
      }
    });
  });
};

export async function getRotatedImage(imageSrc: string, rotation = 0): Promise<string> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  } else {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  if (ctx) {
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((file: Blob | null) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        reject(new Error('Canvas is empty'));
      }
    }, 'image/png');
  });
}
