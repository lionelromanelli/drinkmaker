import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('recipe')
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
