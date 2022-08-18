import { prismaMock, supabaseServiceMock } from '../../../mocks/singleton';
import { ProfileController } from './ProfileController';
let profileClient: ProfileController;
import { Profile } from '@prisma/client';
import { User } from '@supabase/supabase-js';
import { supaUser } from '../../../mocks';
import { SupaUser } from 'types/index';

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
  it('should add metadata to a user', async () => {
    const user = supaUser as unknown as SupaUser;

    supabaseServiceMock.auth.api.updateUserById.mockResolvedValue({
      user,
      error: null,
      data: null,
    });

    await expect(profileClient.addMetadata({ username: 'test', id: user.id })).resolves.toEqual({
      user,
      data: null,
      error: null,
    });
    await expect(profileClient.addMetadata({ username: 'test', id: user.id })).resolves.toEqual({
      user: user,
      data: null,
      error: null,
    });
  });
});
