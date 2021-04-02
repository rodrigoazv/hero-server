/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
/* Controller for connections with marvel api
 *you need to create an instance and call some method on the route
 */
class MarvelController {
  /* Method { @Get } for pick char
   *recive request of char type
   */
  public async indexCharById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { id } = req.params;
      const resp = await axios.get(
        `http://gateway.marvel.com/v1/public/characters/${id}?ts=${process.env.MARVEL_TIMESTAMP}&apikey=${process.env.MARVEL_PUBLIC}&hash=${process.env.MARVEL_HASH}`,
      );
      return res.status(200).json({
        success: true,
        data: resp.data,
      });
    } catch (error) {
      next(error);
    }
  }

  /* Method { @Get } for pick comics
   *recive request of comics type
   */
  public async indexComicsById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { id } = req.params;
      const resp = await axios.get(
        `http://gateway.marvel.com/v1/public/comics/${id}?ts=${process.env.MARVEL_TIMESTAMP}&apikey=${process.env.MARVEL_PUBLIC}&hash=${process.env.MARVEL_HASH}`,
      );
      return res.status(200).json({
        success: true,
        data: resp.data,
      });
    } catch (error) {
      next(error);
    }
  }

  /* Method { @Get } for pick list of char
   *recive request limit and offset
   */
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

  /* Method { @Get } for pick list of comics
   *recive request limit and offset
   */
  public async indexComics(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const { limit, offset } = req.body;
      const resp = await axios.get(
        `http://gateway.marvel.com/v1/public/comics?ts=${process.env.MARVEL_TIMESTAMP}&apikey=${process.env.MARVEL_PUBLIC}&hash=${process.env.MARVEL_HASH}&limit=${limit}&offset=${offset}`,
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
