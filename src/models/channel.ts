import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Message } from './message';
import { User } from './user';

@Entity()
export class Channel {
  constructor(partial?: Partial<Channel>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public isPrivate: boolean; //forbid adding new

  @Column({ unique: true })
  public name: string;

  @ManyToOne(
    type => User,
    user => user.channels,
  )
  @JoinColumn()
  public createdBy: User;

  @ManyToMany(
    type => User,
    user => user.channels,
    { cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
  )
  @JoinTable()
  public users: Array<User>;

  @OneToMany(
    type => Message,
    message => message.channel,
  )
  public messages: Array<Message>;
  @CreateDateColumn()
  public created_at: Date;
}
