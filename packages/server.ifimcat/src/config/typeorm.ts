import config from './';

const { type, host, port, username, password, database } = config.typeorm.db;
const { synchronize, logging } = config.typeorm;

export const typeOrmConfig = {
  type,
  host,
  port,
  username,
  password,
  database,
  synchronize,
  logging,
  // entities: [__dirname + '/../**/*.entity.{js, ts}'],
  autoLoadEntities: true,
};