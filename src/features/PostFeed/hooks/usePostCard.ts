import { useContext } from 'react';
import { PostCardContext } from '../stores/PostCardContext';

export const usePostCard = () => {
  const context = useContext(PostCardContext);
  if (!context) {
    throw new Error('usePostCard must be used within a PostCardProvider');
  }
  return context;
};
