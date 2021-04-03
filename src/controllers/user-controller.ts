/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import User from '@entitys/user';
import UserService from '@service/user-service';
import AuthService from '@service/auth-service';
import { NotFound } from '../helpers/error';
import generateToken from '../helpers/auth-handler';
import {
  updateUserValidator,
  UpdateUser,
  createUserValidator,
  CreateUser,
} from '../schemas/user';

/* Controller for create/update/exclude user
 *you need to create an instance and call some method on the route
 */
class UserController {
  /* Method { @Get } for pick user
   *recive request of User type
   *return token if user is created (Todo)
   */
  public async indexUserById(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const userService = new UserService();
    try {
      const user = await userService.getByIdProtected(req.params.id);

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
      await userService.insertOne(userNew);
      const user = await authService.getByEmail(userNew.email);
      const tokenJwt: string = generateToken(user);
      return res.status(200).json({
        sucess: true,
        token: tokenJwt,
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
      const content = req.body as UpdateUser;
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
