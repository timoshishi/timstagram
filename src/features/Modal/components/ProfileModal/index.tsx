import { ProfileModal as ProfileModalBase } from './ProfileModal';
import { ImageUploaderProvider } from '@features/ImageUploader';

export const ProfileModal = () => {
  return (
    <ImageUploaderProvider shape='round' hasAdditionalStep={false}>
      <ProfileModalBase />
    </ImageUploaderProvider>
  );
};
