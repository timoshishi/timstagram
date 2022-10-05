import { Flex, Icon, chakra } from '@chakra-ui/react';
import { FaRegCommentAlt, FaShare } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { usePostCard } from '@features/PostFeed/hooks/usePostCard';
import { useState } from 'react';
import { togglePostLike } from '../../api';

interface ActionIconsProps {}

export const ActionIcons = ({}: ActionIconsProps) => {
  const { showAuthModal, post, user } = usePostCard();
  const [doesUserLike, setDoesUserLike] = useState(post.hasLiked);
  const [optimisticLikesCount, setOptimisticLikesCount] = useState(post.likeCount);
  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const handleLike = async () => {
    try {
      if (user) {
        setIsLikeLoading(true);
        setDoesUserLike((prevVal) => !prevVal);
        setOptimisticLikesCount((prevVal) => (doesUserLike ? prevVal - 1 : prevVal + 1));
        await togglePostLike(post.postId);
      } else {
        showAuthModal({
          viewType: 'sign_up',
          signUpActionType: 'LIKE',
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLikeLoading(false);
    }
  };

  return (
    <Flex direction='column'>
      <Flex columnGap={4}>
        <chakra.button onClick={() => console.info('share post')} display={'flex'} color='blue.600'>
          <Icon as={FaShare} h={7} w={7} alignSelf={'center'} />
        </chakra.button>
        <chakra.button onClick={() => console.info('comment on post')} display={'flex'}>
          <Icon as={FaRegCommentAlt} h={7} w={7} alignSelf={'center'} />
        </chakra.button>
        <chakra.button onClick={handleLike} display={'flex'} disabled={isLikeLoading} name='post-card-like'>
          <Icon
            as={FiHeart}
            h={7}
            w={7}
            alignSelf={'center'}
            fill={doesUserLike ? 'red' : ''}
            color={doesUserLike ? 'red' : 'black'}
            stroke={doesUserLike ? 'blackAlpha.200' : 'blackAlpha.900'}
          />
        </chakra.button>
      </Flex>
    </Flex>
  );
};
