import { PrismaClient, Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import prisma from '../src/lib/prisma';
import { createClient } from '@supabase/supabase-js';
import knex, { insertDefinedUsers, insertNUsers } from './createUsers';
const supabaseServer = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_ROLE_KEY!);
const prismaClient = new PrismaClient();
console.log('SUPABASURL', process.env.NEXT_PUBLIC_SUPABASE_URL);
const fs = require('fs');
const path = require('path');

const queryPath = path.join(__dirname, '..', 'queries');
const onConfirmUserFunction = fs.readFileSync(path.join(queryPath, 'email-confirm-func.sql'), 'utf8');

(async () => {
  try {
    const resp = await knex.raw(onConfirmUserFunction);
    console.log(resp);
    insertDefinedUsers();
    insertNUsers(25);

    const tableUsers = await supabaseServer.auth.api.listUsers();
    console.log('tableUsers', tableUsers, 'tableUsers.length', tableUsers?.data?.length);
    // if (tableUsers.data) {
    //   const deleteUsers = tableUsers?.data?.map(({ id }) => supabaseServer.auth.api.deleteUser(id));
    //   const resp = await Promise.all(deleteUsers);
    //   console.log(resp);
    // }
    // await prismaClient.flaggedMedia.create({
    //   data: {
    //     id: randomUUID(),
    //     mediaHash: 'hereaerwer',
    //   },
    // });
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
})();
