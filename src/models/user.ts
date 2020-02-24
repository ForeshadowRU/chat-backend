import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
} from 'typeorm';
import { Message } from './message';
import { Channel } from './channel';
import { Server } from './server';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @Column({ unique: true })
  public email: string;
  @PrimaryColumn({ unique: true })
  public username: string;
  @Column('char', { length: 60 })
  @Exclude()
  public password: string;
  @Column()
  public firstname: string;
  @Column()
  public lastname: string;
  @ManyToMany(
    type => Channel,
    channel => channel.users,
  )
  public channels: Array<Channel>;
  @ManyToMany(
    type => Server,
    server => server.members,
  )
  public servers: Array<Server>;
  public messages: Array<Message>;
  @CreateDateColumn()
  public registred_at: Date;
  @UpdateDateColumn()
  public updated_at: Date;
}
