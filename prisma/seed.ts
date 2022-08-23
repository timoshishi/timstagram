import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';
import knex, { definedUsers } from './createUsers';
const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);

console.log('CURRENT SUPABASE URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
const fs = require('fs');
const path = require('path');

const queryPath = path.join(__dirname, '..', 'queries');
const onConfirmUserFunction = fs.readFileSync(path.join(queryPath, 'email-confirm-func.sql'), 'utf8');

/** @describe Create new users in the DB, their profiles should be added automatically */
const createNewUsers = async () => {
  try {
    const userInsertObjs = definedUsers.map((user) => ({
      email: user.email,
      password: user.password,
      user_metadata: {
        bio: faker.lorem.sentence(),
        username: user.username,
        avatarUrl: `https://avatars0.githubusercontent.com/u/${faker.datatype.number({
          min: 1700,
          max: 1799,
        })}?v=4`,
      },
      email_confirm: true,
    }));

    const seedUserPromises = userInsertObjs.map((userObj) => supabaseServer.auth.api.createUser(userObj));
    await Promise.all(seedUserPromises);

    const newUsers = await supabaseServer.auth.api.listUsers();

    console.log('created users:', newUsers?.data?.length, 'error?:', newUsers.error);
  } catch (error) {
    console.log(error);
  }
};
const deleteOldUsers = async () => {
  try {
    const tableUsers = await supabaseServer.auth.api.listUsers();
    if (tableUsers.data) {
      const deleteUsers = tableUsers?.data?.map(({ id }) => supabaseServer.auth.api.deleteUser(id));
      await prisma.profile.deleteMany({
        where: {
          id: {
            in: tableUsers.data.map(({ id }) => id),
          },
        },
      });
      const deleted = await Promise.all(deleteUsers);
      console.log('DELETED', deleted.length);
    }
  } catch (error) {
    console.log(error);
  }
};

(async () => {
  try {
    /***  AUTO CREATE PROFILE ON CONFIRM ***/
    await knex.raw(onConfirmUserFunction);

    /** Wipe old users if for some reason they exist or you are testing scripts */
    await deleteOldUsers();
    /** START NEW USER CREATION **/
    await createNewUsers();
    /** END NEW USER CREATION **/

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
