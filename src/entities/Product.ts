import {Entity, PrimaryGeneratedColumn, Column, Generated} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;
}
