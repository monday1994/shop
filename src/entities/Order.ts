import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Product } from './Product';
import { User } from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'real' })
  price: string;

  @Column({ length: 255 })
  address: string;

  @ManyToMany(() => Product, (product) => product.orders, {nullable: true})
  @JoinTable({ name: 'order_product' })
  products: Product[];

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @Column()
  user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
