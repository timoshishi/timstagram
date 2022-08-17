// https://github.com/hoangvvo/next-connect
import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { NextRequestWithUser } from '@api/types';
import { appendUserToRequest, authenticateHandler } from '@api/router';

// Default Req and Res are IncomingMessage and ServerResponse
// pass in NextApiRequest and NextApiResponse in order to have stronger typing
// NextApiWithUser is extended with req.user where that is the SupaUser interface
// this route has a file so we add the file type - this is not usually needed
const router = createRouter<NextRequestWithUser & { file: Express.Multer.File }, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .get(async (req, res) => {
    return res.status(201).json({ body: 'got you a nested route' });
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
