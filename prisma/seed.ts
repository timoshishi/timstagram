import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';
import knex, { definedUsers } from './createUsers';
import { imageService } from '../src/api/imageService';
// import { createPost } from './createPost';
// import { getImageFileNode } from '../test-utils';

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
        avatarUrl: `/storybook/avatar-${Math.round(Math.random())}.png`,
      },
      email_confirm: true,
    }));

    const seedUserPromises = userInsertObjs.map((userObj) => supabaseServer.auth.api.createUser(userObj));
    await Promise.all(seedUserPromises);

    const newUsers = await supabaseServer.auth.api.listUsers();

    console.log('created users:', newUsers?.data?.length, 'error?:', newUsers.error);
    return newUsers;
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
    /***  AUTO CREATE PROFILE ON CONFIRM RPC FUNCTION ***/
    const results = await knex.raw(onConfirmUserFunction);
    console.log(results, 'ON CONFIRM USER FUNCTION CREATED');
    /** CREATE PERSONAL PHOTO BUCKET */
    if (process.env.ENVIRONMENT === 'ci') {
      await imageService.duplicateExampleBucket();
    }

    /** Wipe old users if for some reason they exist or you are testing scripts */
    console.log('starting to delete users');
    await deleteOldUsers();
    console.log('finished deleting users');
    /** START NEW USER CREATION **/
    console.log('starting to create users');
    const users = await createNewUsers();
    console.log('finished creating users');
    console.log(users);
    /** END NEW USER CREATION **/
    // const [imgBuff, imgFile] = await getImageFileNode('../public/storybook/aspect-1-1.jpg');
    // const createdPost = await createPost({
    //   croppedImage: imgBuff as any,
    //   user: users?.data?.[0]!,
    //   body: {
    //     imageData: '{"dimensions":{"width":300,"height":300},"aspectRatio":1,"originalImageName":"aspect-4-3.jpg"}',
    //     caption: 'here is a picture',
    //   },
    // });
    // console.log(createdPost);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
