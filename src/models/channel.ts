import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Message } from './message';
import { User } from './user';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;
  @ManyToMany(
    type => User,
    user => user.channels,
    { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinTable()
  public users: Array<User>;
  public messages: Array<Message>;
  @CreateDateColumn()
  public created_at: Date;
}
