/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import User from '@entitys/user';
import UserService from '@service/user-service';

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
      // Todo
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
    const userNew = new User();
    try {
      if (!req.body.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
      }
      if (!req.body.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
      }
      userNew.email = req.body.email;
      userNew.firstName = req.body.firstName;
      userNew.lastName = req.body.lastName;
      userNew.nickName = req.body.nickName;
      userNew.password = req.body.password;
      userNew.birthDay = new Date(req.body.birthDay);
      /* Service call to insert one user
       */
      const userCreated = await userService.insertOne(userNew);
      return res.status(200).json({
        sucess: true,
        user: {
          userCreated,
        },
      });
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        errors: 'An error',
      });
      // Todo
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
      if (!req.body.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
      }
      const userOld = await userService.getByEmailProtected(req.body.email);
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
      return res.status(400).json({
        sucess: false,
        errors: 'An error',
      });
      // Todo
    }
  }
}

export default new UserController();
