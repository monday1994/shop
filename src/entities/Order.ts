import { Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToOne, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => Product, (product) => product.orders, { nullable: false })
  @JoinTable({ name: 'order_product' })
  products: Product[];

  //todo probably to solve string id add use https://stackoverflow.com/questions/53426715/typeorm-saving-an-entity-with-many-to-many-relationship-ids

  @ManyToOne(() => User, (user) => user.orders, { nullable: false })
  user: User;

  @Column()
  user_id: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
