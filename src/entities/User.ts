import {Entity, PrimaryGeneratedColumn, Column, Generated} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string
}
