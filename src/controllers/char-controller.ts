import { Request, Response } from 'express';
import axios from 'axios';

class MarvelController {
  public async indexChar(req: Request, res: Response): Promise<any> {
    try {
      const resp = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=${process.env.MARVEL_TIMESTAMP}&apikey=${process.env.MARVEL_PUBLIC}&hash=${process.env.MARVEL_HASH}`,
      );
      return res.status(200).json({
        data: resp.data,
      });
    } catch (error) {
      return res.status(200).json({
        err: error,
      });
    }
  }
}

export default new MarvelController();
