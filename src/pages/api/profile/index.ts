import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { ProfileAPI } from '@api/profile/ProfileAPI';
import prisma from '@src/lib/prisma';
import { NextRequestWithUser } from '@api/types';
import { appendUserToRequest, authenticateHandler, validate } from '@api/router';
const profileClient = new ProfileAPI(prisma);
import { updateProfileValidator } from '@api/profile/profile-validation';

const router = createRouter<NextRequestWithUser & { file: Express.Multer.File }, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .use(async (req, res, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    console.log(`${req.method} ${req.url} ${res.statusCode} ${end - start}ms`);
  })
  .put(authenticateHandler, validate(updateProfileValidator), async (req, res) => {
    await profileClient.updateProfile({ ...req.body, userId: req.user!.id! });
    return res.status(202).end();
  })
  .get(async (req, res) => {
    return res.status(200).json({ user: req.user });
  })
  .post(async (req, res) => {
    const { id, username } = req.body;
    const user = await profileClient.addMetadata({ id, username });
    return res.status(201).json({ user });
  })
  .all((_, res) => {
    res.status(405).json({
      error: 'Method not allowed',
    });
  })
  .handler({
    onError: (err, _, res) => {
      console.error(err);
      res.status(500).json({ res: 'Something broke!', err: err });
    },
    onNoMatch: (_, res) => {
      res.status(404).json({ error: 'Page is not found' });
    },
  });
