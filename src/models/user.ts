import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  Table,
} from 'typeorm';
import { Message } from './message';
import { Channel } from './channel';
import { Server } from './server';
import { Exclude, Expose } from 'class-transformer';

export enum UserStatus {
  ONLINE,
  OFFLINE,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public email: string;
  @Column({ nullable: true })
  public avatar: string;
  @Column('char', { length: 60, nullable: true })
  @Column()
  public firstname: string;
  @Column({ default: UserStatus.ONLINE })
  public status: UserStatus;
  @Column()
  public lastname: string;
  @Expose({ name: 'fullname' })
  getFullName() {
    return `${this.firstname} ${this.lastname}`;
  }
  @Expose({ name: 'initials' })
  getInitials() {
    return `${this.firstname[0]} ${this.lastname[0]}`;
  }
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
