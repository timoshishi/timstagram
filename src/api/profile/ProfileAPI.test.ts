import { prismaMock } from '../../mocks/singleton';
import { ProfileAPI } from './ProfileAPI';
let profileClient: ProfileAPI;
import { Profile } from '@prisma/client';

beforeEach(() => {
  profileClient = new ProfileAPI(prismaMock);
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

// test('should update a users name ', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//   };

//   prismaMock.user.update.mockResolvedValue(user);

//   await expect(updateUsername(user)).resolves.toEqual({
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//   });
// });

// test('should fail if user does not accept terms', async () => {
//   const user = {
//     id: 1,
//     name: 'Rich Haines',
//     email: 'hello@prisma.io',
//     acceptTermsAndConditions: false,
//   };

//   prismaMock.user.create.mockRejectedValue(new Error('User must accept terms!'));

//   await expect(createUser(user)).resolves.toEqual(new Error('User must accept terms!'));
// });
