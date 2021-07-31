import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import {Product} from './Product';
import {User} from './User';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'real' })
  price: string;

  @Column({ length: 255 })
  address: string;

  @OneToMany(() => Product, product => product.order)
  products: Product[];

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
