import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user';

@Entity()
export default class Char {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  charId: string;

  @Column()
  charThumb: string;

  @Column()
  charName: string;

  @ManyToOne(() => User, (user) => user.favoritsChar)
  user: User;
}
