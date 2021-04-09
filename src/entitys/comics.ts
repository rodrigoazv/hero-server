import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import User from './user';

@Entity()
export default class Comic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  comicId: string;

  @Column()
  comicThumb: string;

  @Column()
  comicName: string;

  @ManyToOne(() => User, (user) => user.favoritsComic)
  user: User;
}
