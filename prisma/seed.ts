import { PrismaClient, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import prisma from '../src/lib/prisma';
import { faker } from '@faker-js/faker';
import { createClient } from '@supabase/supabase-js';
import knex, { insertDefinedUsers, insertNUsers, definedUsers, createUserObj, createIdentifyObj } from './createUsers';
const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);
const prismaClient = new PrismaClient();
console.log('SUPABASURL', process.env.NEXT_PUBLIC_SUPABASE_URL);
const fs = require('fs');
const path = require('path');

const queryPath = path.join(__dirname, '..', 'queries');
const onConfirmUserFunction = fs.readFileSync(path.join(queryPath, 'email-confirm-func.sql'), 'utf8');

(async () => {
  try {
    /***  AUTO CREATE PROFILE ON CONFIRM ***/
    await knex.raw(onConfirmUserFunction);

    // const definedUserObjs = definedUsers.map(createUserObj);
    // const definedIdentifyObjs = definedUserObjs.map(createIdentifyObj);
    // await knex.insert(definedUserObjs).into('auth.users');
    // await knex.insert(definedIdentifyObjs).into('auth.identities');
    const tableUsers = await supabaseServer.auth.api.listUsers();
    // console.log('old users', tableUsers?.data?.[0]);
    if (tableUsers.data) {
      const deleteUsers = tableUsers?.data?.map(({ id }) => supabaseServer.auth.api.deleteUser(id));
      await prisma.profile.deleteMany({
        where: {
          id: {
            in: tableUsers.data.map(({ id }) => id),
          },
        },
      });
      await Promise.all(deleteUsers);
    }
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
    const insertPromises = userInsertObjs.map((userObj) => supabaseServer.auth.api.createUser(userObj));
    const userResults = await Promise.all(insertPromises);
    console.log(userResults);

    const newUsers = await supabaseServer.auth.api.listUsers();
    console.log('newUsers', newUsers);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
