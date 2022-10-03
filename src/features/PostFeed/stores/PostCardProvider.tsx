import { PostCardContext } from './PostCardContext';
import { ReactNode } from 'react';
import { useAuthModal } from '@features/AuthModal';
import { PostCardProps } from '../components';
import { PAGE_SIZE } from '@common/constants';

interface PostCardProviderProps extends PostCardProps {
  children: ReactNode;
}

export const PostCardProvider = ({
  children,
  post,
  user,
  currentIdx,
  page,
  imgSize,
  setSize,
  size,
}: PostCardProviderProps) => {
  const { showAuthModal } = useAuthModal();
  // call this after the image has fully loaded
  const triggerFetchOnIndex = () => {
    if (currentIdx === refreshIdx && page === size) {
      setSize(size + 1);
    }
  };

  const refreshIdx = PAGE_SIZE - 5;
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const imgUrl = post.media[0].srcSet[imgSize || 'md'];

  return (
    <PostCardContext.Provider
      value={{ post, user, triggerFetchOnIndex, imgUrl, showAuthModal, refreshIdx, currentIdx, page }}
    >
      {children}
    </PostCardContext.Provider>
  );
};
