import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './user';
import { Channel } from './channel';

@Entity()
export class Server {
  constructor(partial?: Partial<Server>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn('uuid')
  public id?: string;
  @Column()
  public name: string;
  @Column()
  public description: string;
  @ManyToMany(
    () => User,
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
