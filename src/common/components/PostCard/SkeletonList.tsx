import { Box } from '@chakra-ui/react';
import { SkeletonPostCard } from './SkeletonPostCard';

interface SkeletonListProps {
  length?: number;
}

export const SkeletonList = ({ length }: SkeletonListProps) => (
  <>
    {new Array(typeof length === 'number' ? length : 5).fill(
      <Box h='auto' w='100%'>
        <SkeletonPostCard />
      </Box>
    )}
  </>
);
