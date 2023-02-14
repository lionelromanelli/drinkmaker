const config = require('config');
import { DataSource } from 'typeorm';
import { CategoryEntity } from './category/category.entity';
import { IngredientEntity } from './ingredient/ingredient.entity';
import { RecipeEntity } from './recipe/recipe.entity';

export const AppDataSource = new DataSource({
  type: config.get('database.type'),
  host: config.get('database.host'),
  port: config.get('database.port'),
  username: config.get('database.user'),
  password: config.get('database.password'),
  database: config.get('database.database'),
  synchronize: false,
  logging: true,
  entities: [RecipeEntity, CategoryEntity, IngredientEntity],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    // here you can start to work with your database
  })
  .catch((error) => console.error(error));
