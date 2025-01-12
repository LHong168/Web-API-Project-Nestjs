import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as path from 'path';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRESSQL_HOST,
  port: +process.env.POSTGRESSQL_PORT,
  username: process.env.POSTGRESSQL_USERNAME,
  password: process.env.POSTGRESSQL_PASSWORD,
  database: process.env.POSTGRESSQL_DATABASE,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: true,
});
