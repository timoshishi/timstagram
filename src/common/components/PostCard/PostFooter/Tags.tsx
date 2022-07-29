import { Link } from '@chakra-ui/react';

interface TagsProps {
  tags: string[];
  postId: string;
}
export const Tags = ({ tags, postId }: TagsProps) => (
  <>
    {tags.slice(0, 3).map((tag, i) => (
      <Link
        mr='2'
        mb='1'
        fontSize='sm'
        onClick={() => console.log('go to tag')}
        key={`${postId}-${i}-#${tag}`}
        color='teal.500'>
        {' '}
        #{tag}
      </Link>
    ))}
  </>
);
