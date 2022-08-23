import { Knex, knex } from 'knex';
import { faker } from '@faker-js/faker';

export const definedUsers = [
  { id: '0061b8f6-2f6f-4c55-a0f8-10c6962f9ba1', email: 'test1@test.com', username: 'test1', password: 'password' },
  { id: 'dfe1c7bd-e128-4a0f-898e-404f5506d6d6', email: 'test2@test.com', username: 'test2', password: 'password' },
  { id: 'caeb9e29-a6f2-49f9-bd5b-eb191f034b68', email: 'test3@test.com', username: 'test3', password: 'password' },
  { id: 'd024e81d-4155-449e-a9e2-4869c3db9d5a', email: 'test4@test.com', username: 'test4', password: 'password' },
  { id: 'd124e81d-4155-449e-a9e2-4869c3db9d5a', email: 'test5@test.com', username: 'test5', password: 'password' },
];

const config: Knex.Config = {
  client: 'pg',
  connection: 'postgresql://postgres:postgres@localhost:54322/postgres',
  searchPath: ['knex', 'public', 'auth'],
};
const mockUsr = {
  instance_id: '00000000-0000-0000-0000-000000000000',
  id: 'undefined',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'undefined',
  email_confirmed_at: '2022-08-23 17:36:40.720262+00',
  confirmation_sent_at: '2022-08-23 17:36:31.157588+00',
  last_sign_in_at: '2022-08-23 17:36:40.722032+00',
  raw_app_meta_data: '{"provider":"email","providers":["email"]}',
  raw_user_meta_data: '{"bio":"","username":"timfrrs","avatarUrl":""}',
  is_super_admin: false,
  created_at: '2022-08-23 17:36:31.150679+00',
  email_change_confirm_status: 0,
};

export const createUserObj = ({
  id,
  email,
  username,
}: {
  id: string;
  email: string;
  username?: string;
}): typeof mockUsr => ({
  ...mockUsr,
  id,
  email,
  raw_user_meta_data: JSON.stringify({
    bio: faker.lorem.sentence(),
    username: username || faker.internet.userName(),
    avatarUrl: `https://avatars0.githubusercontent.com/u/${faker.datatype.number({
      min: 1700,
      max: 1799,
    })}?v=4`,
  }),
});

export const createIdentifyObj = (user: typeof mockUsr): any => ({
  id: user.id,
  user_id: user.id,
  identity_data: JSON.stringify({ sub: user.id }),
  provider: 'email',
  last_sign_in_at: user.last_sign_in_at,
  created_at: user.created_at,
});

const userObjects = definedUsers.map(createUserObj);
const identifyObjects = userObjects.map(createIdentifyObj);
const knexInstance = knex(config);

const insertDefinedUsers = async () => {
  await knexInstance.insert(userObjects).into('auth.users');
  await knexInstance.insert(identifyObjects).into('auth.identities');
  const users = await knexInstance('users').select();
};

export const createNUsers = (n: number) => {
  const userIdsAndEmails = Array.from({ length: n }, (_, i) => ({
    id: faker.datatype.uuid() as string,
    email: faker.internet.email() as string,
  }));
  return userIdsAndEmails.map(createUserObj);
};

export const createIdentities = (users: typeof mockUsr[]) => {
  const identities = users.map(createIdentifyObj);
  return identities;
};

const insertNUsers = async (n: number) => {
  const users = await createNUsers(n);
  const identities = await createIdentities(users);
  const userPromises = users.map(async (user) => {
      await knexInstance.insert(user).into('auth.users');
    }),
    identityPromises = identities.map(async (identity) => {
      await knexInstance.insert(identity).into('auth.identities');
    }),
    promises = [...userPromises, ...identityPromises];
  await Promise.all(promises);
};

export { insertDefinedUsers, insertNUsers };
export default knexInstance;
