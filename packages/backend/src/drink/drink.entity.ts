import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('drink')
export class DrinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
