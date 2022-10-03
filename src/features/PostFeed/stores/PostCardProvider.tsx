import { PostCardContext } from './PostCardContext';
import { ReactNode, useCallback } from 'react';
import { useAuthModal } from '@features/AuthModal';
import { PostCardProps } from '../components';

interface PostCardProviderProps extends PostCardProps {
  children: ReactNode;
}

export const PostCardProvider = ({
  children,
  post,
  user,
  currentIdx,
  refreshIdx,
  page,
  imgSize,
  setSize,
  size,
}: PostCardProviderProps) => {
  const { showAuthModal } = useAuthModal();
  // call this after the image has fully loaded
  const triggerFetchOnIndex = useCallback(() => {
    () => {
      if (currentIdx === refreshIdx && page === size) {
        setSize(size + 1);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imgUrl = post.media[0].srcSet[imgSize || 'md'];

  return (
    <PostCardContext.Provider value={{ post, user, triggerFetchOnIndex, imgUrl, showAuthModal }}>
      {children}
    </PostCardContext.Provider>
  );
};
