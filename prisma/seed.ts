import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';
import { createClient, User } from '@supabase/supabase-js';
import knex, { definedUsers } from './createUsers';
import { ImageService } from '../src/api/services/ImageService';
import { PostService } from '../src/api/services/PostService';
import { s3Client } from '../src/lib/s3Client';
import { randomUUID } from 'crypto';
import { ImageProperties } from '../src/api/types';
import { SupaUser } from 'types/index';
import { Post } from '@prisma/client';
import { DEFAULT_IMAGE_PLACEHOLDER } from '../src/common/constants';
import fs from 'fs';
import path from 'path';

const imageService = new ImageService(process.env.PHOTO_BUCKET!, s3Client);
const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);
const postService = new PostService(prisma);
console.log('CURRENT SUPABASE URL', process.env.NEXT_PUBLIC_SUPABASE_URL);

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
      return deleted;
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteOldData = async () => {
  await prisma.media.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.post.deleteMany();
  await prisma.postHash.deleteMany();
};

const createMockImageProperties = (arr: any, createdUsers: { data: User[] }): ImageProperties[] => {
  return arr.map((data: any) => {
    const { filename, aspectRatio, dimensions, url, size, bucket, key } = data;
    const { width, height } = dimensions;
    const { id: userId } = createdUsers.data[Math.floor(Math.random() * createdUsers.data.length)];
    const imageId = randomUUID();

    return {
      id: randomUUID(),
      filename: key, // reusing the key to the example folder, this would usually be replaced by a uuid
      aspectRatio,
      width,
      height,
      url,
      size,
      bucket,
      alt: 'example image',
      placeholder: DEFAULT_IMAGE_PLACEHOLDER,
      hash: 'example-hash',
      source: 'example-source',
      userId,
      domain: process.env.IMAGE_HOST_DOMAIN!,
      metadata: '{}',
      type: 'png',
    };
  });
};

const createPosts = async (createdUsers: { data: User[] }): Promise<Post[]> => {
  const objects = await imageService.copyOrReplaceExampleObjects();
  const copiedImageProperties = createMockImageProperties(objects, createdUsers);
  const postPromises = copiedImageProperties.map((imageProperties) => {
    return postService.createPost({
      imageProperties,
      caption: faker.lorem.sentence(),
      user: createdUsers.data.find((user) => user.id === imageProperties.userId)! as SupaUser,
    });
  });
  const posts = await Promise.all(postPromises);
  return posts;
};

(async () => {
  try {
    if (process.env.ENVIRONMENT === 'ci') {
      await imageService.duplicateExampleBucket();
    }
    /***  AUTO CREATE PROFILE ON CONFIRM RPC FUNCTION ***/
    const results = await knex.raw(onConfirmUserFunction);
    console.log('onConfirmUserFunction created:', JSON.stringify(results, null, 2));

    if (process.env.ENVIRONMENT === 'local' || process.env.ENVIRONMENT === 'test' || process.env.APP_ENV === 'ci') {
      /** CREATE PERSONAL PHOTO BUCKET */
      // delete data before users
      await deleteOldData();
      /** Wipe old users if for some reason they exist or you are testing scripts */
      const deletedUsers = await deleteOldUsers();
      console.log('deleted users:', deletedUsers?.length);
      /** START NEW USER CREATION **/
      const createdUsers = await createNewUsers();
      if (!createdUsers || createdUsers.error) {
        console.log(createdUsers?.error);
      }
      console.log('Created users:', createdUsers?.data?.length);
      /** END NEW USER CREATION **/

      if (createdUsers?.data) {
        /** CREATE POSTS */
        // copy images from example bucket to personal bucket and create posts
        const posts = await createPosts(createdUsers);
        console.log('created posts:', posts.length);
        /** END CREATE POSTS */
      }
    }

    process.exit(0);
  } catch (error) {
    console.log('ERROR');
    console.error(error);
    process.exit(0);
  }
})();
