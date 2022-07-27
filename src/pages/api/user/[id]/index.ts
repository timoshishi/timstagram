import { faker } from '@faker-js/faker';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // create a user object
  const userId = req.query.id;
  const user = {
    id: userId,
    username: faker.internet.userName(),
    verifiedAt: faker.date.past(),
    avatarUrl: faker.internet.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    banned: faker.datatype.boolean(),
    isBot: faker.datatype.boolean(),
    email: faker.internet.email(),
  };

  if (req.method === 'GET') {
    res.json(user);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}