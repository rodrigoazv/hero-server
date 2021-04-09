/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import User from '@entitys/user';
import Char from '@entitys/char';

import UserService from '@service/user-service';
import AuthService from '@service/auth-service';
import { AuthFail } from 'src/middlewares/verify-token-handler';
import axios from 'axios';
import CharService from '@service/char-service';
import ComicService from '@service/comic-service';
import Comic from '@entitys/comics';
import { NotFound } from '../helpers/error';
import generateToken from '../helpers/auth-handler';
import {
  updateUserValidator,
  ValidFiedlUser,
  createUserValidator,
  CreateUser,
  LikeCharComics,
} from '../schemas/user';

/* Controller for create/update/exclude user
 *you need to create an instance and call some method on the route
 */
class UserController {
  /* Method { @Get } for pick user
   *recive request of UserId type
   *return token if user is created
   */
  public async indexUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const userService = new UserService();
    try {
      const user = await userService.getByIdProtected(req.userId);

      return res.status(200).json({
        sucess: true,
        user: {
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  /* Method { @Get } for pick user
   *recive request of UserId type
   *return token if user is created
   */
  public async likeByUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const userService = new UserService();
    try {
      const user = await userService.getByIdProtected(req.userId);

      return res.status(200).json({
        sucess: true,
        likedChar: user.favoritsChar,
        likedComic: user.favoritsComic,
      });
    } catch (error) {
      next(error);
    }
  }

  /* Method { @POST } for like char or comic
   *recive request of Char type
   *return token if char like by user
   */
  public async likeCharComic(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const userService = new UserService();
    const charService = new CharService();
    const comicService = new ComicService();
    const char = new Char();
    const comic = new Comic();
    try {
      const content = req.body as LikeCharComics;
      const resp = await axios.get(
        `http://gateway.marvel.com/v1/public/${content.type}/${content.id}?ts=${process.env.MARVEL_TIMESTAMP}&apikey=${process.env.MARVEL_PUBLIC}&hash=${process.env.MARVEL_HASH}`,
      );
      if (resp.data.data.results.length < 1) {
        throw new NotFound('No char or comic find');
      }

      const userOld: User = await userService.getByIdProtected(req.userId);

      if (content.type === 'characters') {
        char.charId = content.id;
        char.charName = content.name;
        char.charThumb = content.thumb;
        char.user = userOld;
        await charService.insertOne(char, content.like);
      } else if (content.type === 'comics') {
        comic.comicId = content.id;
        comic.comicName = content.name;
        comic.comicThumb = content.thumb;
        comic.user = userOld;
        await comicService.insertOne(comic, content.like);
      }

      return res.status(200).json({
        sucess: true,
      });
    } catch (error) {
      next(error);
    }
  }

  /* Method { @Post } for create user
   *recive request of User type
   *return token if user is created (Todo)
   */
  public async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const userService = new UserService();
    const authService = new AuthService();
    const userNew = new User();
    try {
      createUserValidator(req.body);
      const content = req.body as CreateUser;
      userNew.email = content.email;
      userNew.firstName = content.firstName;
      userNew.lastName = content.lastName;
      userNew.nickName = content.nickName;
      userNew.password = content.password;
      userNew.birthDay = new Date(content.birthDay);
      /* Service call to insert one user
       */
      const userByNick = await userService.getByNickProtected(content.nickName);

      if (userByNick) {
        throw new AuthFail('NickName already exist');
      }

      const userByEmail = await userService.getByEmailProtected(content.email);
      if (userByEmail) {
        throw new AuthFail('Email already exist');
      }

      await userService.insertOne(userNew);

      const user = await authService.getByEmail(userNew.email);
      const token: string = generateToken(user);
      res.cookie('authorization', token);
      return res.status(200).json({
        sucess: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  /* Method { @Put } for update user
   *recive request with email and details to update
   *return user if update work (Todo)
   */
  public async update(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const userService = new UserService();
    try {
      updateUserValidator(req.body);
      const content = req.body as ValidFiedlUser;
      const userOld = await userService.getByEmailProtected(content.email);
      if (!userOld) {
        throw new NotFound('User not found');
      }
      // verify params, if not pass, recive same
      userOld.firstName = req.body.firstName || userOld.firstName;
      userOld.nickName = req.body.nickName || userOld.nickName;
      /* Service call to update one user
       */
      const userCreated = await userService.updateUser(userOld);
      return res.status(200).json({
        sucess: true,
        user: {
          userCreated,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
