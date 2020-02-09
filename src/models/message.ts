import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Chat } from './chat';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public text: string;
  @Column()
  public sender: string;
  @ManyToOne(
    type => Chat,
    chat => chat.messages,
  )
  public chat: Chat;

  @CreateDateColumn()
  public created_at: Date;
}
