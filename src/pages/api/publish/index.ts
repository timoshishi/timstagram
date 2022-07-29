import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// PUT /api/publish/:id
// POST TO PUBLISH A POST
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  const session = await getSession({ req });

  if (session) {
    // const post = await prisma.post.update({
    //   where: { id: postId },
    //   data: { published: true },
    // });
    res.json({ message: 'Post published' });
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
}
