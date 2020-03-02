import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Channel } from './channel';

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
  @JoinTable()
  public members: Array<User>;
  @OneToMany(
    _ => Channel,
    () => undefined,
    { cascade: true },
  )
  public channells: Array<Channel>;
}
