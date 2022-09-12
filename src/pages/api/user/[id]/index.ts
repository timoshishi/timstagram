import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.json({ message: 'hello' });
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
