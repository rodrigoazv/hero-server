import { Request, Response } from 'express';
import User from '@entitys/user';
import UserService from '../service/user-service';

class UserController {
  // public method for create user
  // recive a body with User instance
  public async create(req: Request, res: Response): Promise<any> {
    const userService = new UserService();
    try {
      const userNew = new User();
      if (!req.body.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
      }
      if (!req.body.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
      }
      if (!req.body.birthDay) {
        return res.status(422).json({ errors: { birthDay: "can't be blank" } });
      }
      userNew.email = req.body.email;
      userNew.firstName = req.body.firstName;
      userNew.lastName = req.body.lastName;
      userNew.nickName = req.body.nickName;
      userNew.password = req.body.password;
      userNew.birthDay = req.body.birthDay;
      const userCreated = await userService.insertOne(userNew);
      return res.status(200).json({
        sucess: true,
        user: {
          userCreated,
        },
      });
    } catch {
      return res.status(200).json({
        sucess: true,
        error: 'An error',
      });
      // Todo
    }
  }
}

export default new UserController();
