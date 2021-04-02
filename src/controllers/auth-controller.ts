/* eslint-disable consistent-return */
import { NextFunction, Request, Response } from 'express';
import AuthService from '@service/auth-service';
import { NotFound } from '../helpers/error';
import AuthHandler from '../utils/auth-handler';
import { createUserValidator, UserRequest } from '../schemas/user';

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
    const authHandler = new AuthHandler();
    try {
      createUserValidator(req.body);
      const content = req.body as UserRequest;
      const user = await authService.getByEmail(content.email);

      if (!user) {
        throw new NotFound('User not found');
      }
      // Call to util authHandler, to generateToken
      const token: string = authHandler.generateToken(user);
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
