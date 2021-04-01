import { getManager, Repository } from 'typeorm';

import User from '@entitys/user';

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
}
