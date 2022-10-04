import fs from 'fs/promises';
import path from 'path';
import { Knex } from 'knex';

/**
 * @description This function is used to insert data into the database.
 * @param knex - The knex instance.
 * @param sqlFilename - the sql file name (without extension) from the queries folder.
 */
export const writeRawSQL = async (knex: Knex, sqlFilename: string): Promise<Knex.Raw> => {
  try {
    const sql = await fs.readFile(path.join(__dirname, '..', 'queries', sqlFilename), 'utf8');
    console.log('SQL', sql);
    return knex.raw(sql);
  } catch (error) {
    console.error(error);
  }
};
