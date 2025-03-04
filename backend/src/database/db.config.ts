import * as path from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.POSTGRESSQL_HOST,
  port: +(process.env.POSTGRESSQL_PORT || '5432'),
  username: process.env.POSTGRESSQL_USERNAME,
  password: process.env.POSTGRESSQL_PASSWORD,
  database: process.env.POSTGRESSQL_DATABASE,
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: true
});
