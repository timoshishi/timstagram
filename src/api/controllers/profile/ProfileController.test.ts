import { prismaMock, supabaseServiceMock } from '../../../mocks/singleton';
import { ProfileController } from './ProfileController';
let profileClient: ProfileController;
import { Profile } from '@prisma/client';
import { supaUser, supaUserResponse } from '../../../mocks/supaUser';
import { SupaUser } from 'types/index';
import { RequestMethod, createMocks } from 'node-mocks-http';
import { NextRequestWithUser } from '@api/types';
import { NextApiResponse } from 'next';

beforeEach(() => {
  profileClient = new ProfileController(prismaMock, supabaseServiceMock);
});

describe('getProfile', () => {
  it('should get a profile', async () => {
    const profile: Profile = {
      username: 'test',
      id: '1',
      bio: 'test',
      avatarUrl: 'test',
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
    req.headers = {
      // 'Content-Type': 'application/json',
    };
    // req.query = { gatewayID: `${gatewayID}` };
    return { req, res } as unknown as { req: NextRequestWithUser; res: NextApiResponse };
  }

  it('should add metadata to a user', async () => {
    const { req, res } = mockRequestResponse();
    const user = supaUser as unknown as SupaUser;
    req.user = user;
    req.body = {
      username: 'test',
    };
    supabaseServiceMock.auth.api.updateUserById.mockResolvedValue({
      user,
      error: null,
      data: null,
    });
    await profileClient.addMetadata(req, res);
    expect(res.statusCode).toBe(201);
    const data = res._getJSONData();
    expect(data).toEqual(supaUserResponse);
  });
  it('should return status 500 if there is no user id on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = null;
    req.body = {
      username: 'test',
    };

    await profileClient.addMetadata(req, res);
    expect(res.statusCode).toBe(500);
  });
  it('should return status 500 if there is no username on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = supaUserResponse as unknown as SupaUser;
    req.body = {};

    await profileClient.addMetadata(req, res);
    expect(res.statusCode).toBe(500);
  });
});

describe('updateProfile', () => {
  function mockRequestResponse(method: RequestMethod = 'PUT') {
    const { req, res } = createMocks({
      method,
    });
    req.headers = {
      // 'Content-Type': 'application/json',
    };
    // req.query = { gatewayID: `${gatewayID}` };
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
    expect(res.statusCode).toBe(200);
    const data = res._getJSONData();
    expect(data).toEqual({
      profile: {
        bio: 'here is a super long bio',
        avatarUrl: 'https://avatars0.githubusercontent.com/u/1234?v=4',
        username: 'test',
      },
    });
  });

  it('should return status 500 if there is no user id on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = null;
    req.body = {
      bio: 'test',
    };

    await profileClient.updateProfile(req, res);
    expect(res.statusCode).toBe(500);
  });

  it('should return status 500 if there is no bio on the request', async () => {
    const { req, res } = mockRequestResponse();
    req.user = supaUserResponse as unknown as SupaUser;
    req.body = {};

    await profileClient.updateProfile(req, res);
    expect(res.statusCode).toBe(400);
  });
});
