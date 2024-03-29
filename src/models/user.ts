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
  OneToMany,
} from 'typeorm';
import { Message } from './message';
import { Channel } from './channel.entity';
import { Server } from './server';
import { Exclude, Expose } from 'class-transformer';

export enum UserStatus {
  ONLINE,
  OFFLINE,
}

@Entity()
export class User {
  constructor(partial?: Partial<User>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ unique: true })
  public email: string;
  @Column({ nullable: true })
  public avatar: string;
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

  @OneToMany((type) => Channel, (channel) => channel.createdBy)
  public ownedChannels: Array<Channel>;
  @ManyToMany((type) => Channel, (channel) => channel.users)
  public channels: Array<Channel>;
  @ManyToMany((type) => Server, (server) => server.members)
  public servers: Array<Server>;

  public messages: Array<Message>;
  @Column({ default: 1 })
  public last_used_channel: number;
  @CreateDateColumn()
  public registred_at: Date;
  @UpdateDateColumn()
  public updated_at: Date;
}
