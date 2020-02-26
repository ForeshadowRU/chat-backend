import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
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
  @ManyToOne(
    type => Channel,
    channel => channel.server,
    { cascade: true },
  )
  @JoinTable()
  public channells: Array<Channel>;
}
