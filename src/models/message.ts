import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Channel } from './channel';
import { User } from './user';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public text: string;
  @ManyToOne(
    type => User,
    user => user.messages,
  )
  public sender: string;
  @ManyToOne(
    type => Channel,
    chat => chat.messages,
    { lazy: true },
  )
  @JoinColumn()
  public chat: Channel;

  @CreateDateColumn()
  public created_at: Date;
}
