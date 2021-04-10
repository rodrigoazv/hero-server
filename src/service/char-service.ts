import { getManager, Repository } from 'typeorm';

import Char from '../entitys/char';

export default class CharService {
  charRepository: Repository<Char>;

  constructor() {
    this.charRepository = getManager().getRepository(Char);
  }

  /**
   * Returns array of all  Char s from db
   */
  instantiate(data: Object): Char | undefined {
    return this.charRepository.create(data);
  }

  async insertOne(data: Char, like: boolean) {
    const { charName, user } = data;
    if (!like) {
      const newChar = this.charRepository.create(data);
      const charSaved = await this.charRepository.save(newChar);
      return charSaved;
    }
    const deletechar = this.charRepository.delete({
      charName,
      user,
    });
    return deletechar;
  }
}
