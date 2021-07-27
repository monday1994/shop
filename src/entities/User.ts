import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';
import moment from 'moment';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column({ length: 255})
  firstName: string;

  @Column({ length: 255 })
  lastName: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;
}
