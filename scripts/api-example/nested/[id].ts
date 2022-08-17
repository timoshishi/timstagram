// https://github.com/hoangvvo/next-connect
import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { NextRequestWithUser } from '@api/types';
import { appendUserToRequest } from '@api/router';

const router = createRouter<NextRequestWithUser & { file: Express.Multer.File }, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .get(async (req, res) => {
    return res.status(201).json({ body: 'got you a nested route WITH A PATH ' + req.url });
  })
  .handler({
    onError: (err, req, res) => {
      console.error(err);
      res.status(500).json({ res: 'Something broke!', err: err });
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ error: 'Page is not found' });
    },
  });
