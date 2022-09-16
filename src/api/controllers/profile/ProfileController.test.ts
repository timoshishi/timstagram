import { prismaMock, supabaseServiceMock } from '../../../mocks/singleton';
import { ProfileController } from './ProfileController';
let profileClient: ProfileController;
import { Profile } from '@prisma/client';
import path from 'path';
import { supaUser, supaUserResponse } from '../../../mocks/supaUser';
import type { SupaUser } from '@src/types/index';
import { RequestMethod, createMocks } from 'node-mocks-http';
import { NextRequestWithUser } from '@api/types';
import { NextApiResponse } from 'next';
import fs from 'fs';
const fixturesDir = path.join(__dirname, '../../../../__mocks__/fixtures');
const oneAspect = path.join(fixturesDir, 'aspect-1-1.jpg');
import 'crypto';
import { rest } from 'msw';

const imageId = '4184012e-2641-44be-97c4-508461dc7840';
const aws = `https://${process.env.PHOTO_BUCKET}.s3.amazonaws.com/${imageId}.jpeg`;

const constructUploadUrl = jest.fn();
constructUploadUrl.mockReturnValue(aws);

jest.mock('../../services/ImageService', () => ({
  imageService: {
    uploadFileToS3: jest.fn(),
  },
}));
// mock image id
jest.mock('crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('4184012e-2641-44be-97c4-508461dc7840'),
}));
export const handlers = [
  // capture s3 upload file request
  rest.put(aws, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
beforeEach(() => {
  profileClient = new ProfileController(prismaMock, supabaseServiceMock);
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('getProfile', () => {
  it('should get a profile', async () => {
    const profile: Profile = {
      username: 'test',
      id: '1',
      bio: 'test',
      avatarUrl: 'test',
      avatarId: 'avatar-id',
      avatarBucket: 'avatar-bucket',
      avatarFilename: 'avatar-filename.jpg',
      avatarDomain: 'avatar-domain',
      createdAt: new Date(),
      updatedAt: new Date(),
      isBot: false,
      banned: false,
    };

    prismaMock.profile.findUnique.mockResolvedValue(profile);
    await expect(profileClient.getProfile('2')).resolves.not.toEqual({ ...profile, id: '2' });
    await expect(profileClient.getProfile('1')).resolves.toEqual(profile);
  });
});

describe('addMetadata', () => {
  function mockRequestResponse(method: RequestMethod = 'GET') {
    const { req, res } = createMocks({
      method,
    });
    req.headers = {};
    return { req, res } as unknown as { req: NextRequestWithUser; res: NextApiResponse };
  }

  it('should add metadata to a user', async () => {
    const { req, res } = mockRequestResponse();
    const user = supaUser as unknown as SupaUser;
    req.user = user;
    req.body = {
      username: 'test',
    };

    await supabaseServiceMock.auth.api.updateUserById.mockResolvedValue({
      user,
      error: null,
      data: null,
    });
    await profileClient.addMetadata(req, res);
    await expect(res.statusCode).toBe(200);
    // @ts-ignore/
    const data = await res._getJSONData();
    expect(data).toEqual(supaUserResponse);
    res.end();
  });

  it('should return status 500 if there is no user id on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = null;
    req.body = {
      username: 'test',
    };

    await profileClient.addMetadata(req, res);
    expect(res.statusCode).toEqual(500);
    res.end();
  });

  it('should return status 500 if there is no username on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = supaUserResponse as unknown as SupaUser;
    req.body = {};

    await profileClient.addMetadata(req, res);
    expect(res.statusCode).toEqual(500);
    res.end();
  });
});

describe('updateProfile', () => {
  function mockRequestResponse(method: RequestMethod = 'PUT') {
    const { req, res } = createMocks({
      method,
    });
    req.headers = {};
    return { req, res } as unknown as { req: NextRequestWithUser; res: NextApiResponse };
  }

  it('should add a bio to the user', async () => {
    const { req, res } = mockRequestResponse();
    const user = supaUser as unknown as SupaUser;
    req.user = user;
    req.body = {
      bio: 'test',
    };
    prismaMock.profile.update.mockResolvedValue({
      bio: 'here is a super long bio',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1234?v=4',
      username: 'test',
    } as any);
    await profileClient.updateProfile(req, res);
    expect(res.statusCode).toBe(204);
    // @ts-ignore/
    const data = res._getJSONData();
    expect(data).toEqual({
      profile: {
        bio: 'here is a super long bio',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/1234?v=4',
        username: 'test',
      },
    });
    res.end();
  });

  it('should return status 500 if there is no user id on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = null;
    req.body = {
      bio: 'test',
    };

    await profileClient.updateProfile(req, res);
    expect(res.statusCode).toBe(401);
    res.end();
  });

  it('should return status 400 if there is no bio on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = supaUserResponse as unknown as SupaUser;
    req.body = {};

    await profileClient.updateProfile(req, res);
    expect(res.statusCode).toBe(400);
    res.end();
  });
});

describe('updateAvatar', () => {
  let buffer: Buffer;
  let file: Express.Multer.File;
  beforeEach(() => {
    buffer = fs.readFileSync(oneAspect);
    file = {
      fieldname: 'avatar',
      originalname: 'aspect-1-1.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      buffer,
      size: buffer.length,
      destination: '',
      filename: 'aspect-1-1.jpg',
      path: oneAspect,
      stream: fs.createReadStream(oneAspect),
    };
  });
  function mockRequestResponse(method: RequestMethod = 'POST') {
    const { req, res } = createMocks({
      method,
    });
    req.headers = {
      'Content-Type': 'multipart/form-data',
    };

    return { req, res } as unknown as {
      req: NextRequestWithUser & { file: Express.Multer.File };
      res: NextApiResponse;
    };
  }
  it('should return a 500 status if there is an error', async () => {
    const { req, res } = mockRequestResponse();
    const user = supaUser as unknown as SupaUser;
    req.user = user;
    req.file = file;
    req.body = {
      imageData: JSON.stringify({
        dimensions: { width: 300, height: 300 },
        aspectRatio: 1,
        originalImageName: 'aspect-4-3.jpg',
      }),
    };

    prismaMock.media.create.mockResolvedValue({
      userId: '1',
      id: '1',
      avatarUrl: 'test',
      username: 'test',
    } as any);

    await profileClient.updateUserAvatar(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.statusCode).not.toBe(500);
    // @ts-ignore/
    const data = res._getJSONData();
    expect(data.url).toEqual(aws);
    res.end();
  });

  it('should return an object that contains a URL', async () => {
    const { req, res } = mockRequestResponse();
    const user = supaUser as unknown as SupaUser;
    req.user = user;
    req.body = {
      imageData: JSON.stringify({
        dimensions: { width: 300, height: 300 },
        aspectRatio: 1,
        originalImageName: 'aspect-4-3.jpg',
      }),
    };

    prismaMock.media.create.mockResolvedValue({
      userId: '1',
      id: '1',
      avatarUrl: 'test',
      username: 'test',
    } as any);

    await profileClient.updateUserAvatar(req, res);
    expect(res.statusCode).not.toBe(204);
    expect(res.statusCode).toBe(500);
    res.end();
  });
});
