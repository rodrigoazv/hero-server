/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import AuthService from '../service/auth-service';
import User from '../entitys/user';
import { AuthFail } from '../middlewares/verify-token-handler';
import { NotFound } from '../helpers/error';
import generateToken from '../helpers/auth-handler';
import { loginUserValidator, UserRequest } from '../schemas/user';

/* Controller for auth
 *you need to create an instance and call some method on the route
 */
class AuthController {
  /* Method { @Post } for login auth
   *recive request with email and password ( Required params )
   *return token if user exist
   */

  public async login(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const authService = new AuthService();

    try {
      loginUserValidator(req.body);
      const content = req.body as UserRequest;
      const user: User = await authService.getByEmail(content.email);
      if (!user) {
        throw new NotFound('User not found');
      }
      const passOk = await bcrypt.compare(content.password, user.password);

      if (!passOk) {
        throw new AuthFail('Invalid pass');
      }
      // Call to util authHandler, to generateToken
      const token: string = generateToken(user);
      res.cookie('authorization', token, {
        maxAge: 1000 * 60 * 10,
        httpOnly: false,
        sameSite: 'none',
      });
      return res.status(200).json({
        sucess: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
