import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

import Comics from './comics';
import Char from './char';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  nickName: string;

  @Column()
  birthDay: Date;

  @OneToMany(() => Comics, (favorit) => favorit.user)
  favoritsComic: Comics[];

  @OneToMany(() => Char, (favorit) => favorit.user, {
    cascade: true,
  })
  @JoinColumn()
  favoritsChar: Char[];

  async setPassword(newPassword: string) {
    this.password = await bcrypt.hash(newPassword, 10);
  }

  @BeforeInsert()
  async encryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
