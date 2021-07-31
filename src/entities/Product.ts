import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order';
import { Category } from './Category';

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

  @ManyToOne(() => Order, (order) => order.products)
  order: Order;

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
