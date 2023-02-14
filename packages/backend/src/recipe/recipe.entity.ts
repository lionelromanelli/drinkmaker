import { IngredientEntity } from 'src/ingredient/ingredient.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => IngredientEntity)
  @JoinTable({
    name: 'recipe_ingredient',
    joinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ingredient_id', referencedColumnName: 'id' },
  })
  ingredients: Promise<IngredientEntity[]>;
}
