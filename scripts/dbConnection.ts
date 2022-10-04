import knex, { Knex } from 'knex';
const config: Knex.Config = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  searchPath: ['knex', 'public', 'auth'],
};

export const knexInstance = knex(config);
