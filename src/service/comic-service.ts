import { getManager, Repository } from 'typeorm';

import Comic from '../entitys/comics';

export default class comicService {
  comicRepository: Repository<Comic>;

  constructor() {
    this.comicRepository = getManager().getRepository(Comic);
  }

  /**
   * Returns array of all  comic s from db
   */
  instantiate(data: Object): Comic | undefined {
    return this.comicRepository.create(data);
  }

  async insertOne(data: Comic, like: boolean) {
    const { comicName, user } = data;
    if (!like) {
      const newComic = this.comicRepository.create(data);
      const comicSaved = await this.comicRepository.save(newComic);
      return comicSaved;
    }
    const deleteComic = this.comicRepository.delete({
      comicName,
      user,
    });
    return deleteComic;
  }
}
