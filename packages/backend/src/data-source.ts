const config = require('config');
import { DataSource } from 'typeorm';
import { DrinkEntity } from './drink/drink.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.user'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  synchronize: false,
  logging: true,
  entities: [DrinkEntity],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.error(error));
