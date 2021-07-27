import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 2000 })
  description: string;

  @Column({ type: 'real' })
  price: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
