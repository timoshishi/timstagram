// https://github.com/hoangvvo/next-connect
import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { uploadMiddleware } from '@src/api/handleImageUpload';
import bodyParser from 'body-parser';
import { ProfileController } from '@api/controllers/profile/ProfileController';
import prisma from '@src/lib/prisma';
import supabaseServer from '@src/lib/initSupabaseServer';
import { NextRequestWithUser } from '@src/api/types';
import { appendUserToRequest, authenticateHandler } from '@src/api/router';
const profileClient = new ProfileController(prisma, supabaseServer);

// Default Req and Res are IncomingMessage and ServerResponse
// pass in NextApiRequest and NextApiResponse in order to have stronger typing
// NextApiWithUser is extended with req.user where that is the SupaUser interface
// this route has a file so we add the file type - this is not usually needed
const router = createRouter<NextRequestWithUser & { file: Express.Multer.File }, NextApiResponse>();

export default router
  .use(appendUserToRequest) // custom middleware to add user
  .use(expressWrapper(cors())) // express middleware are supported if you wrap it with expressWrapper
  .use(async (req, res, next) => {
    const start = Date.now();
    // await next in async middlewares
    await next();
    const end = Date.now();
    console.log(`Request took ${end - start}ms`);
  })
  .post(
    expressWrapper(<any>uploadMiddleware), // this is an instance of multer middleware added to a single route - express middleware needs expressWrapper (<any> is)
    authenticateHandler, // custom middleware to authenticate a single route, to authentical all routes use withApiAuth from @next/auth-helpers-nextjs
    async (req, res) => {
      if (!req.user) {
        throw new Error('User is not logged in');
      }
      const response = await profileClient.updateUserAvatar({
        croppedImage: req.file,
        imageData: JSON.parse(req.body.imageData),
        user: req.user,
      });
      return res.json({ file: req.file.fieldname, body: response });
    }
  )
  // add json parser back in as it is overruled in the config below to support multer middleware above
  .use(expressWrapper(bodyParser.json()))
  .get(async (req, res) => {
    const { user } = req;
    return res.status(201).json({ user: user });
  })
  .put(
    // chain middleware and handler
    (req, res, next) => {
      // don't await next in sync middlewares
      next();
    },
    async (req, res) => {
      // const user = await updateUser(req.body.user);
      res.json({ status: 'put-ok' });
    }
  );
// this runs if none of the above routes match
router
  .all((req, res) => {
    res.status(405).json({
      error: 'Method not allowed',
    });
  })
  .handler({
    // error and nommatch handling
    onError: (err, req, res) => {
      console.error(err);
      res.status(500).json({ res: 'Something broke!', err: err });
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ error: 'Page is not found' });
    },
  });

// next defaults to accepting application/json as the content type
// this is overruled in the config to support multer middleware above
export const config = {
  api: {
    bodyParser: false,
  },
};
