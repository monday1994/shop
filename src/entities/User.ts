import {Entity, PrimaryGeneratedColumn, Column, Generated, Unique} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true})
  email: string;

  @Column()
  password: string
}
