import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ingredient')
export class IngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
