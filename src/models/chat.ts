import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column()
  public name: string;

  public messages: Array<Message>;
  @CreateDateColumn()
  public created_at: Date;
}
