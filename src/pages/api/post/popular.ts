import getFeed from '@common/api/getFeed';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { PostResponse } from 'types/post.types';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const page = req.query.page ? parseInt(req.query.page as string) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 15;
  const posts = await getFeed(limit, page);

  if (req.method === 'GET') {
    return void res.json(posts);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
