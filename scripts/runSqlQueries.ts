import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import { writeRawSQL } from './writeRawSql';
import { knexInstance } from './dbConnection';

// Pass sql query name into the command line when running this script
(async () => {
  const sqlPromises = [...process.argv.slice(2)].map((q) => writeRawSQL(knexInstance, `${q}.sql`));
  console.log(process.env.DATABASE_URL);
  const responses = await Promise.all(sqlPromises);
  console.log('responses', responses);
  process.exit(0);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
