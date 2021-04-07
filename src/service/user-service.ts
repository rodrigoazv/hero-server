import { getManager, Repository } from 'typeorm';

import User from '@entitys/user';
import Char from '@entitys/char';

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
    const userSaved = await this.userRepository
      .createQueryBuilder()
      .relation(User, 'favoritsChar')
      .of(User)
      .add(char);
    return userSaved;
  }

  async getByIdProtected(id: string): Promise<User | any> {
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

  async getByNickProtected(nickName: string): Promise<User | any> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.nickName = :nickName', { nickName })
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
