/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

class MarvelController {
  public async indexChar(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, offset } = req.body;
      const resp = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=${process.env.MARVEL_TIMESTAMP}&apikey=${process.env.MARVEL_PUBLIC}&hash=${process.env.MARVEL_HASH}&limit=${limit}&offset=${offset}`,
      );
      return res.status(200).json({
        success: true,
        data: resp.data,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MarvelController();
