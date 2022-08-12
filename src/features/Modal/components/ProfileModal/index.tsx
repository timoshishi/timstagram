import { ProfileModal as ProfileModalBase } from './ProfileModal';
import { ImageUploaderProvider, useCreateUploaderContext } from '@features/ImageUploader';

export const ProfileModal = () => {
  return (
    <ImageUploaderProvider initialValue={useCreateUploaderContext()}>
      <ProfileModalBase />
    </ImageUploaderProvider>
  );
};
