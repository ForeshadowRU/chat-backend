import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Server {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @ManyToMany(
    type => User,
    user => user.servers,
    { cascade: true },
  )
  public members: Array<User>;
}
