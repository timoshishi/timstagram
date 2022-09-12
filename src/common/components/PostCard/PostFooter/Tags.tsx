import { Link } from '@chakra-ui/react';
import { Tag } from 'types/post.types';

interface TagsProps {
  tags: Tag[];
  postId: string;
}
export const Tags = ({ tags, postId }: TagsProps) => (
  <>
    {tags
      .slice(0, 3)
      .map((tag, i) => (
        <Link
          mr='2'
          mb='1'
          fontSize='sm'
          onClick={() => console.info('go to tag')}
          key={`${postId}-${i}-#${tag}`}
          color='teal.500'
        >
          <>#{tag.name}</>
        </Link>
      ))
      .join(' ')}
  </>
);
