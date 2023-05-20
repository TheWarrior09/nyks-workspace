import { Sequelize } from 'sequelize';
import { env } from '../env';

const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: 'postgres',
  logging: false,
});
