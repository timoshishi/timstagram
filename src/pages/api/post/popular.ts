import type { PostCardProps } from '@common/components/PostCard';
import { faker } from '@faker-js/faker';
import type { NextApiRequest, NextApiResponse } from 'next';
import { post } from '../../../../__mocks__/fixtures/post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const count = 100;
  const posts: PostCardProps[] = new Array(count).fill(post);

  if (req.method === 'GET') {
    res.json({
      posts: posts,
      total: faker.datatype.number({ min: 100, max: 10000 }),
      page: page,
    });
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
