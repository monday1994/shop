import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {Product} from './Product';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
