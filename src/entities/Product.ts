import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn, RelationId
} from 'typeorm';
import { Order } from './Order';
import {Category} from './Category';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ type: 'real' })
  price: string;

  @ManyToMany(() => Order, (order) => order.products, {nullable:true})
  orders: Order[];

  @ManyToOne(() => Category, (category) => category.products, { nullable: false })
  category: Category;

  // used for fighting with problem in saving category via id
  @Column()
  category_id: string

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
