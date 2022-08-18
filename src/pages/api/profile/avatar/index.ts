// https://github.com/hoangvvo/next-connect
import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { uploadMiddleware } from '@src/api/handleImageUpload';
import { ProfileController } from '@api/controllers/profile/ProfileController';
import prisma from '@src/lib/prisma';
import { NextRequestWithUser } from '@src/api/types';
import { appendUserToRequest, authenticateHandler } from '@src/api/router';
import supabaseService from '@src/lib/initSupabaseServer';
const profileController = new ProfileController(prisma, supabaseService);

const router = createRouter<NextRequestWithUser & { file: Express.Multer.File }, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .post(expressWrapper(<any>uploadMiddleware), authenticateHandler, async (req, res) => {
    if (!req.user) {
      throw new Error('User is not logged in');
    }
    const response = await profileController.updateUserAvatar({
      croppedImage: req.file,
      imageData: JSON.parse(req.body.imageData),
      user: req.user,
    });
    return res.json({ file: req.file.fieldname, body: response });
  })
  .all((_, res) => {
    res.status(405).json({
      error: 'Method not allowed',
    });
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

export const config = {
  api: {
    bodyParser: false,
  },
};
