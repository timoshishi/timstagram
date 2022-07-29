import { NextApiRequest, NextApiResponse } from 'next';
import { post } from '../../../../__mocks__/fixtures/post';

// make a handler that returns a single post
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const postId = req.query.postId;

    if (req.method === 'GET') {
      return res.json(post);
    } else {
      return res.status(405).send(`Method ${req.method} not allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
}
