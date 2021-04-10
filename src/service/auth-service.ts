import { getManager, Repository } from 'typeorm';

import User from '../entitys/user';

export default class AuthService {
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

  async getByEmail(email: string): Promise<User | any> {
    try {
      const user = this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .addSelect('user.password')
        .getOne();
      return user;
    } catch (err) {
      return err;
    }
  }
}
