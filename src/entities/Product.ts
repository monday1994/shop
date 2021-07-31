import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from 'typeorm';
import { Order } from './Order';
import {Category} from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  //@Generated('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ type: 'real' })
  price: string;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;

  // used for fighting with problem in saving category via id
  @Column()
  category_id: string

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
