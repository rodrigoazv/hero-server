import { getManager, Repository } from 'typeorm';

import User from '@entitys/user';
import Char from '@entitys/char';
import Comic from '@entitys/comics';

export default class UserService {
  userRepository: Repository<User>;

  constructor() {
    this.userRepository = getManager().getRepository(User);
  }

  /**
   * Returns array of all users from db
   */
  instantiate(data: Object): User | undefined {
    return this.userRepository.create(data);
  }

  async insertOne(data: User) {
    const newUser = this.userRepository.create(data);
    const userSaved = await this.userRepository.save(newUser);
    return userSaved;
  }

  async updateUser(data: User) {
    const userSaved = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(data)
      .where('id = :id', { id: data.id })
      .execute();
    return userSaved;
  }

  async updateUserChars(char: Char) {
    const favoritChar = await this.userRepository.findOne(char.user.id, {
      relations: ['favoritsChar'],
    });
    favoritChar?.favoritsChar.push(char);
    return favoritChar;
  }

  async updateUserComics(comic: Comic) {
    const favoritComic = await this.userRepository.findOne(comic.user.id, {
      relations: ['favoritsComic'],
    });
    favoritComic?.favoritsComic.push(comic);
    return favoritComic;
  }

  async getByNickProtected(
    nickName: string,
    relation?: boolean,
  ): Promise<User | any> {
    if (!relation) {
      const user = this.userRepository.findOne({
        where: {
          nickName,
        },
      });
      return user;
    }
    const user = this.userRepository.findOne({
      where: {
        nickName,
      },
      relations: ['favoritsChar', 'favoritsComic'],
    });
    return user;
  }

  async getByIdProtected(id: string, relation?: boolean): Promise<User | any> {
    if (!relation) {
      const user = this.userRepository.findOneOrFail({
        where: {
          id,
        },
      });
      return user;
    }
    const user = this.userRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['favoritsChar', 'favoritsComic'],
    });
    return user;
  }

  async getByEmailProtected(email: string): Promise<User | any> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  async setLikeChar(nickName: string): Promise<User | any> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.nickName = :nickName', { nickName })
      .getOne();
    return user;
  }
}
