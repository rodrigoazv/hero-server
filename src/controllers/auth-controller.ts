import { Request, Response } from 'express';
import AuthService from '@service/auth-service';
import AuthHandler from '../utils/auth-handler';
/* Controller for auth
 *you need to create an instance and call some method on the route
 */
class AuthController {
  /* Method { @Post } for login auth
   *recive request with email and password ( Required params )
   *return token if user exist
   */
  public async login(req: Request, res: Response): Promise<any> {
    const authService = new AuthService();
    const authHandler = new AuthHandler();
    try {
      if (!req.body.email) {
        return res.status(422).json({ errors: { email: "can't be blank" } });
      }
      if (!req.body.password) {
        return res.status(422).json({ errors: { password: "can't be blank" } });
      }
      const user = await authService.getByEmail(req.body.email);
      if (!user) {
        return res.status(400).json({ errors: { user: 'user not find' } });
      }
      // Call to util authHandler, to generateToken
      const token: string = authHandler.generateToken(user);
      return res.status(200).json({
        sucess: true,
        token,
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

export default new AuthController();
