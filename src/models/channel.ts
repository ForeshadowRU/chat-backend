import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Message } from './message';
import { User } from './user';
import { Server } from './server';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public isPrivate: boolean; //forbid adding new

  @Column()
  public name: string;
  @ManyToMany(
    type => User,
    user => user.channels,
    { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinTable()
  public users: Array<User>;

  @ManyToOne(
    type => Server,
    server => server.channells,
  )
  @JoinColumn()
  public server: Server;

  public messages: Array<Message>;
  @CreateDateColumn()
  public created_at: Date;
}
