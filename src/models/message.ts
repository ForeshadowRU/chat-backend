import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Channel } from './channel.entity';
import { User } from './user';

@Entity()
export class Message {
  constructor(partial?: Partial<Message>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  public id: number;
  @Column('text')
  public text: string;
  @ManyToOne(
    type => User,
    user => user.messages,
  )
  public sender: User;
  @ManyToOne(
    type => Channel,
    chat => chat.messages,
  )
  @JoinColumn()
  public channel: Channel;

  @CreateDateColumn()
  public created_at: Date;
}
